import {useState, useEffect, useCallback} from 'react';
import ApiService from '../services/api';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial posts
  const fetchPosts = useCallback(async (pageNumber = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const newPosts = await ApiService.fetchPosts(pageNumber, 10);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => {
          if (isRefresh || pageNumber === 1) {
            return newPosts;
          } else {
            // Avoid duplicates
            const existingIds = new Set(prevPosts.map(post => post.id));
            const filteredNewPosts = newPosts.filter(post => !existingIds.has(post.id));
            return [...prevPosts, ...filteredNewPosts];
          }
        });
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage, false);
    }
  }, [fetchPosts, loadingMore, hasMore, page]);

  // Refresh posts
  const refreshPosts = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1, true);
  }, [fetchPosts]);

  // Toggle like on a post
  const toggleLike = useCallback(async (postId) => {
    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex === -1) return;

      const post = posts[postIndex];
      const result = await ApiService.toggleLike(postId, post.isLiked);

      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts[postIndex] = {
          ...newPosts[postIndex],
          isLiked: result.isLiked,
          likes: newPosts[postIndex].likes + result.likes,
        };
        return newPosts;
      });
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [posts]);

  // Initialize posts on mount
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  return {
    posts,
    loading,
    refreshing,
    loadingMore,
    error,
    hasMore,
    fetchPosts,
    loadMorePosts,
    refreshPosts,
    toggleLike,
  };
};

export default usePosts;