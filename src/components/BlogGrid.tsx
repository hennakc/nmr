import React from 'react';
import type { BlogPost } from '../types';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (!posts.length) return null;

  return (
    <div
      className="blog-grid"
      role="list"
      aria-label="Photography blog posts"
    >
      {posts.map((post) => (
        <div key={post.id} role="listitem">
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
