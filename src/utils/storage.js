import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PROFILE: 'user_profile',
  LIKED_POSTS: 'liked_posts',
  CACHED_POSTS: 'cached_posts',
  APP_SETTINGS: 'app_settings',
  NOTIFICATIONS: 'notifications',
};

class StorageService {
  // Generic methods
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // User profile methods
  async saveUserProfile(userProfile) {
    await this.setItem(KEYS.USER_PROFILE, userProfile);
  }

  async getUserProfile() {
    return await this.getItem(KEYS.USER_PROFILE);
  }

  async clearUserProfile() {
    await this.removeItem(KEYS.USER_PROFILE);
  }

  // Liked posts methods
  async saveLikedPosts(likedPosts) {
    await this.setItem(KEYS.LIKED_POSTS, likedPosts);
  }

  async getLikedPosts() {
    const likedPosts = await this.getItem(KEYS.LIKED_POSTS);
    return likedPosts || [];
  }

  async addLikedPost(postId) {
    const likedPosts = await this.getLikedPosts();
    if (!likedPosts.includes(postId)) {
      likedPosts.push(postId);
      await this.saveLikedPosts(likedPosts);
    }
  }

  async removeLikedPost(postId) {
    const likedPosts = await this.getLikedPosts();
    const updatedLikedPosts = likedPosts.filter(id => id !== postId);
    await this.saveLikedPosts(updatedLikedPosts);
  }

  async isPostLiked(postId) {
    const likedPosts = await this.getLikedPosts();
    return likedPosts.includes(postId);
  }

  // Cached posts methods
  async saveCachedPosts(posts) {
    const cacheData = {
      posts,
      timestamp: Date.now(),
    };
    await this.setItem(KEYS.CACHED_POSTS, cacheData);
  }

  async getCachedPosts(maxAge = 5 * 60 * 1000) { // 5 minutes default
    const cacheData = await this.getItem(KEYS.CACHED_POSTS);
    
    if (!cacheData) {
      return null;
    }

    const isExpired = Date.now() - cacheData.timestamp > maxAge;
    if (isExpired) {
      await this.removeItem(KEYS.CACHED_POSTS);
      return null;
    }

    return cacheData.posts;
  }

  async clearCachedPosts() {
    await this.removeItem(KEYS.CACHED_POSTS);
  }

  // App settings methods
  async saveAppSettings(settings) {
    await this.setItem(KEYS.APP_SETTINGS, settings);
  }

  async getAppSettings() {
    const defaultSettings = {
      theme: 'light',
      notificationsEnabled: true,
      autoPlayVideos: true,
      dataUsageMode: 'normal',
    };

    const savedSettings = await this.getItem(KEYS.APP_SETTINGS);
    return { ...defaultSettings, ...savedSettings };
  }

  async updateAppSetting(key, value) {
    const currentSettings = await this.getAppSettings();
    const updatedSettings = { ...currentSettings, [key]: value };
    await this.saveAppSettings(updatedSettings);
  }

  // Notifications methods
  async saveNotifications(notifications) {
    await this.setItem(KEYS.NOTIFICATIONS, notifications);
  }

  async getNotifications() {
    return await this.getItem(KEYS.NOTIFICATIONS) || [];
  }

  async addNotification(notification) {
    const notifications = await this.getNotifications();
    notifications.unshift(notification); // Add to beginning
    
    // Keep only last 100 notifications
    if (notifications.length > 100) {
      notifications.splice(100);
    }
    
    await this.saveNotifications(notifications);
  }

  async markNotificationAsRead(notificationId) {
    const notifications = await this.getNotifications();
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    await this.saveNotifications(updatedNotifications);
  }

  async markAllNotificationsAsRead() {
    const notifications = await this.getNotifications();
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    await this.saveNotifications(updatedNotifications);
  }

  async clearNotifications() {
    await this.removeItem(KEYS.NOTIFICATIONS);
  }

  // Utility methods
  async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}

export default new StorageService();