import React from 'react';
import type { BlogPost } from '../types';
import VideoPlayer from './VideoPlayer';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article
      id={`blog-card-${post.id}`}
      className="blog-card"
      aria-label={post.title}
    >
      {/* Video with all hover effects */}
      <VideoPlayer src={post.media_url} showHoverEffects />

      {/* Text row */}
      <div className="blog-card-text-row">
        <h3 className="blog-card-title">{post.title}</h3>
        <span
          className="blog-category-badge"
          style={{ backgroundColor: post.category_color }}
          aria-label={`Category: ${post.category}`}
        >
          {post.category}
        </span>
      </div>
    </article>
  );
};

export default BlogCard;
