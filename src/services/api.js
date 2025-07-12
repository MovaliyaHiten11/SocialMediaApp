const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock images for posts
const mockImages = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6',
  'https://picsum.photos/400/300?random=7',
  'https://picsum.photos/400/300?random=8',
  'https://picsum.photos/400/300?random=9',
  'https://picsum.photos/400/300?random=10',
];

// Mock avatar images
const mockAvatars = [
  'https://ui-avatars.com/api/?name=John+Doe&background=007AFF&color=fff&size=100',
  'https://ui-avatars.com/api/?name=Jane+Smith&background=FF3B30&color=fff&size=100',
  'https://ui-avatars.com/api/?name=Bob+Johnson&background=34C759&color=fff&size=100',
  'https://ui-avatars.com/api/?name=Alice+Brown&background=FF9500&color=fff&size=100',
  'https://ui-avatars.com/api/?name=Charlie+Davis&background=5856D6&color=fff&size=100',
];

class ApiService {
  // Fetch posts with pagination
  async fetchPosts(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}`,
      );
      const posts = await response.json();
      
      // Enhance posts with additional data
      const enhancedPosts = await Promise.all(
        posts.map(async post => {
          const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`);
          const user = await userResponse.json();
          
          return {
            ...post,
            user: {
              ...user,
              avatar: mockAvatars[Math.floor(Math.random() * mockAvatars.length)],
            },
            image: Math.random() > 0.3 ? mockImages[Math.floor(Math.random() * mockImages.length)] : null,
            likes: Math.floor(Math.random() * 100) + 1,
            isLiked: false,
            comments: Math.floor(Math.random() * 20) + 1,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          };
        }),
      );
      
      return enhancedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Fetch comments for a post
  async fetchComments(postId) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
      const comments = await response.json();
      
      // Enhance comments with additional data
      const enhancedComments = comments.map(comment => ({
        ...comment,
        avatar: mockAvatars[Math.floor(Math.random() * mockAvatars.length)],
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      }));
      
      return enhancedComments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Fetch user profile
  async fetchUserProfile(userId = 1) {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      const user = await response.json();
      
      return {
        ...user,
        avatar: mockAvatars[0],
        bio: 'Software developer and photography enthusiast. Love to travel and explore new places.',
        followers: Math.floor(Math.random() * 1000) + 100,
        following: Math.floor(Math.random() * 500) + 50,
        posts: Math.floor(Math.random() * 200) + 20,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // Mock notifications
  async fetchNotifications() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        {
          id: 1,
          type: 'like',
          message: 'John Doe liked your post',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
          avatar: mockAvatars[0],
        },
        {
          id: 2,
          type: 'comment',
          message: 'Jane Smith commented on your post',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          read: false,
          avatar: mockAvatars[1],
        },
        {
          id: 3,
          type: 'follow',
          message: 'Bob Johnson started following you',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          avatar: mockAvatars[2],
        },
        {
          id: 4,
          type: 'like',
          message: 'Alice Brown liked your post',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          read: true,
          avatar: mockAvatars[3],
        },
      ];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  // Like/Unlike post
  async toggleLike(postId, isLiked) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Return updated like status
      return {
        isLiked: !isLiked,
        likes: isLiked ? -1 : 1, // Delta for likes count
      };
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}

export default new ApiService();