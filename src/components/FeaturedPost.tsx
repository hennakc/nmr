import React from 'react';
import type { BlogPost } from '../types';
import VideoPlayer from './VideoPlayer';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <article
      id="blog-featured-post"
      className="blog-featured"
      aria-label={`Featured: ${post.title}`}
    >
      {/* Left — Video */}
      <div className="blog-featured-video-side">
        <VideoPlayer
          src={post.media_url}
          showHoverEffects
          style={{ height: '100%', minHeight: '520px', borderRadius: 0 }}
        />
      </div>

      {/* Right — Content */}
      <div className="blog-featured-content-side">
        <div className="blog-featured-content-inner">
          {/* Must Read badge */}
          {post.badge && (
            <span className="blog-must-read-badge" aria-label="Must read post">
              {post.badge}
            </span>
          )}

          {/* Title */}
          <h2 className="blog-featured-title">{post.title}</h2>

          {/* Description */}
          {post.description && (
            <p className="blog-featured-description">{post.description}</p>
          )}
        </div>

        {/* Footer */}
        <footer className="blog-featured-footer">
          {post.author && (
            <span className="blog-featured-author">{post.author}</span>
          )}
          {post.category && (
            <span
              className="blog-category-badge"
              style={{ backgroundColor: post.category_color }}
              aria-label={`Category: ${post.category}`}
            >
              {post.category}
            </span>
          )}
        </footer>
      </div>
    </article>
  );
};

export default FeaturedPost;
