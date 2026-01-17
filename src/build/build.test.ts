import { describe, it, expect } from 'vitest';
import {
  renderTemplate,
  formatDate,
  renderPostCard,
  getPosts,
  Post,
} from './build';

describe('renderTemplate', () => {
  it('should replace single placeholder', () => {
    const template = '<h1>{{title}}</h1>';
    const result = renderTemplate(template, { title: 'Hello World' });
    expect(result).toBe('<h1>Hello World</h1>');
  });

  it('should replace multiple placeholders', () => {
    const template = '<h1>{{title}}</h1><p>{{description}}</p>';
    const result = renderTemplate(template, {
      title: 'Hello',
      description: 'World',
    });
    expect(result).toBe('<h1>Hello</h1><p>World</p>');
  });

  it('should leave unmatched placeholders unchanged', () => {
    const template = '<h1>{{title}}</h1><p>{{missing}}</p>';
    const result = renderTemplate(template, { title: 'Hello' });
    expect(result).toBe('<h1>Hello</h1><p>{{missing}}</p>');
  });

  it('should handle empty data object', () => {
    const template = '<h1>{{title}}</h1>';
    const result = renderTemplate(template, {});
    expect(result).toBe('<h1>{{title}}</h1>');
  });

  it('should handle template with no placeholders', () => {
    const template = '<h1>Static Content</h1>';
    const result = renderTemplate(template, { title: 'Ignored' });
    expect(result).toBe('<h1>Static Content</h1>');
  });

  it('should handle empty string values', () => {
    const template = '<h1>{{title}}</h1>';
    const result = renderTemplate(template, { title: '' });
    expect(result).toBe('<h1></h1>');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2025-01-17');
    expect(result).toBe('January 17, 2025');
  });

  it('should handle different months', () => {
    expect(formatDate('2025-06-15')).toBe('June 15, 2025');
    expect(formatDate('2025-12-25')).toBe('December 25, 2025');
  });

  it('should handle single digit days', () => {
    const result = formatDate('2025-03-05');
    expect(result).toBe('March 5, 2025');
  });
});

describe('renderPostCard', () => {
  const mockPost: Post = {
    title: 'Test Post',
    date: '2025-01-17',
    description: 'A test post description',
    slug: 'test-post',
    content: '<p>Post content</p>',
  };

  it('should render post card with correct structure', () => {
    const result = renderPostCard(mockPost);
    expect(result).toContain('<li class="post-card">');
    expect(result).toContain('</li>');
  });

  it('should include post title with link', () => {
    const result = renderPostCard(mockPost);
    expect(result).toContain('<a href="/blog/test-post/">Test Post</a>');
  });

  it('should include formatted date', () => {
    const result = renderPostCard(mockPost);
    expect(result).toContain('January 17, 2025');
  });

  it('should include description', () => {
    const result = renderPostCard(mockPost);
    expect(result).toContain('A test post description');
  });

  it('should have correct CSS classes', () => {
    const result = renderPostCard(mockPost);
    expect(result).toContain('class="post-card"');
    expect(result).toContain('class="post-meta"');
    expect(result).toContain('class="post-description"');
  });
});

describe('getPosts', () => {
  it('should return an array', () => {
    const posts = getPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it('should return posts with required properties', () => {
    const posts = getPosts();
    if (posts.length > 0) {
      const post = posts[0];
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('content');
    }
  });

  it('should sort posts by date (newest first)', () => {
    const posts = getPosts();
    if (posts.length > 1) {
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date).getTime();
        const nextDate = new Date(posts[i + 1].date).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    }
  });

  it('should parse markdown content to HTML', () => {
    const posts = getPosts();
    if (posts.length > 0) {
      const post = posts[0];
      expect(post.content).toContain('<');
      expect(post.content).toContain('>');
    }
  });
});
