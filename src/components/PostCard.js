import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import CommentModal from './CommentModal';
import Icons from '../utils/icons';

const { width } = Dimensions.get('window');

const PostCard = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleLike = () => {
    onLike(post.id);
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: post.body,
        url: post.image || '', // Share the post image URL if available
        title: `Post by ${post.user.name}`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing post:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FastImage
          source={{ uri: post.user.avatar }}
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.user.name}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(post.timestamp)}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icons.MaterialIcons name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        <Text style={styles.postText}>{post.body}</Text>
        {post.image && (
          <FastImage
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Icons.MaterialIcons
            name={post.isLiked ? 'favorite' : 'favorite-border'}
            size={24}
            color={post.isLiked ? '#FF3B30' : '#666'}
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowComments(true)}
        >
          <Icons.MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icons.MaterialIcons name="share" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Comments Modal */}
      <CommentModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        postId={post.id}
        postTitle={post.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 16,
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    marginBottom: 12,
  },
  postImage: {
    width: width - 32,
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#FF3B30',
  },
});

export default PostCard;