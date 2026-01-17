import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const ROOT_DIR = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content/posts');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'src/templates');
const STYLES_DIR = path.join(ROOT_DIR, 'src/styles');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Types
export interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
  content: string;
}

export interface TemplateData {
  [key: string]: string;
}

// Read template file
export function readTemplate(name: string): string {
  const templatePath = path.join(TEMPLATES_DIR, `${name}.html`);
  return fs.readFileSync(templatePath, 'utf-8');
}

// Simple template engine - replace {{placeholders}}
export function renderTemplate(template: string, data: TemplateData): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// Render full page with base layout
function renderPage(content: string, data: TemplateData): string {
  const baseTemplate = readTemplate('base');
  return renderTemplate(baseTemplate, {
    ...data,
    content,
    year: new Date().getFullYear().toString(),
  });
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get all posts from markdown files
export function getPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No content/posts directory found. Creating empty posts list.');
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  const posts: Post[] = files.map(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      slug: data.slug || file.replace('.md', ''),
      content: marked(content) as string,
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Generate post card HTML
export function renderPostCard(post: Post): string {
  return `
    <li class="post-card">
      <h3><a href="/blog/${post.slug}/">${post.title}</a></h3>
      <p class="post-meta">${formatDate(post.date)}</p>
      <p class="post-description">${post.description}</p>
    </li>
  `;
}

// Ensure directory exists
function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy directory recursively
function copyDir(src: string, dest: string): void {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main build function
function build(): void {
  console.log('Building site...\n');

  // Clean and create dist directory
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  ensureDir(DIST_DIR);

  // Get posts
  const posts = getPosts();
  console.log(`Found ${posts.length} posts`);

  // Generate post cards HTML
  const allPostCards = posts.map(renderPostCard).join('\n');
  const recentPostCards = posts.slice(0, 3).map(renderPostCard).join('\n');

  // Build home page
  console.log('Building: /index.html');
  const homeTemplate = readTemplate('home');
  const homeContent = renderTemplate(homeTemplate, { posts: recentPostCards });
  const homePage = renderPage(homeContent, {
    title: 'Mohanad Elhag - Frontend Engineer',
    description: 'Personal blog and portfolio of a frontend engineer rebuilding fundamentals.',
  });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homePage);

  // Build blog list page
  console.log('Building: /blog/index.html');
  ensureDir(path.join(DIST_DIR, 'blog'));
  const blogTemplate = readTemplate('blog');
  const blogContent = renderTemplate(blogTemplate, { posts: allPostCards || '<p>No posts yet.</p>' });
  const blogPage = renderPage(blogContent, {
    title: 'Blog - Mohanad Elhag',
    description: 'Blog posts about frontend development and learning.',
  });
  fs.writeFileSync(path.join(DIST_DIR, 'blog/index.html'), blogPage);

  // Build individual post pages
  for (const post of posts) {
    console.log(`Building: /blog/${post.slug}/index.html`);
    ensureDir(path.join(DIST_DIR, 'blog', post.slug));
    const postTemplate = readTemplate('post');
    const postContent = renderTemplate(postTemplate, {
      title: post.title,
      date: post.date,
      formattedDate: formatDate(post.date),
      content: post.content,
    });
    const postPage = renderPage(postContent, {
      title: `${post.title} - Mohanad Elhag`,
      description: post.description,
    });
    fs.writeFileSync(path.join(DIST_DIR, 'blog', post.slug, 'index.html'), postPage);
  }

  // Build about page
  console.log('Building: /about/index.html');
  ensureDir(path.join(DIST_DIR, 'about'));
  const aboutTemplate = readTemplate('about');
  const aboutPage = renderPage(aboutTemplate, {
    title: 'About - Mohanad Elhag',
    description: 'About me - a frontend engineer rebuilding fundamentals.',
  });
  fs.writeFileSync(path.join(DIST_DIR, 'about/index.html'), aboutPage);

  // Build experiments page
  console.log('Building: /experiments/index.html');
  ensureDir(path.join(DIST_DIR, 'experiments'));
  const experimentsTemplate = readTemplate('experiments');
  const experimentsPage = renderPage(experimentsTemplate, {
    title: 'Experiments - Mohanad Elhag',
    description: 'Web experiments and demos.',
  });
  fs.writeFileSync(path.join(DIST_DIR, 'experiments/index.html'), experimentsPage);

  // Copy styles
  console.log('Copying: /styles/');
  copyDir(STYLES_DIR, path.join(DIST_DIR, 'styles'));

  // Copy public assets if they exist
  const publicDir = path.join(ROOT_DIR, 'public');
  if (fs.existsSync(publicDir)) {
    console.log('Copying: /public/ assets');
    const entries = fs.readdirSync(publicDir);
    for (const entry of entries) {
      const srcPath = path.join(publicDir, entry);
      const destPath = path.join(DIST_DIR, entry);
      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  console.log('\nBuild complete! Output in /dist');
}

// Run build only when executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  build();
}
