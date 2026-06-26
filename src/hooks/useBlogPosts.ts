import { useState, useEffect } from 'react';
import type { BlogPost } from '../types';
import { getBlogPosts } from '../lib/supabase';
import { staticBlogPosts } from '../data/blogData';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(staticBlogPosts);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Failed to load posts');
        setPosts(staticBlogPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return { posts, loading, error };
}
