import React from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import FeaturedPost from './FeaturedPost';
import BlogGrid from './BlogGrid';
import '../styles/blog.css';

const BlogSection: React.FC = () => {
  const { posts, loading } = useBlogPosts();

  const featuredPost = posts.find((p) => p.type === 'featured');
  const gridPosts = posts.filter((p) => p.type === 'grid');

  return (
    <section
      id="blog-section"
      className="blog-section"
      aria-labelledby="blog-title"
    >
      <div className="blog-container">
        {/* Header */}
        <header className="blog-header">
          <div className="blog-header-left">
            <span className="blog-badge" aria-label="Blog section">Blog</span>
            <h2 id="blog-title" className="blog-main-title">
              Behind the lens
            </h2>
            <p className="blog-subtitle">
              Thoughts, insights, and stories from my photography journey. Take a peek into my creative process and recent projects.
            </p>
          </div>
          <div className="blog-header-right">
            <button
              id="blog-view-all-btn"
              className="blog-view-all-btn"
              aria-label="View all blog posts"
              onClick={() => {}}
            >
              View all posts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              color: '#888',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
            }}
            role="status"
            aria-live="polite"
          >
            Loading posts…
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && <FeaturedPost post={featuredPost} />}

            {/* Grid */}
            {gridPosts.length > 0 && (
              <div style={{ marginTop: '32px' }}>
                <BlogGrid posts={gridPosts} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
