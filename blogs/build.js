const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");
const hljs = require("highlight.js");

// Configure markdown-it with plugins
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
}).use(anchor, {
  permalink: anchor.permalink.ariaHidden({
    placement: "after",
  }),
});

// Helper function to create slug from filename
function createSlug(filename) {
  return filename.replace(".md", "");
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("vi-VN", options);
}

// Helper function to convert date to ISO format
function toISODate(dateString) {
  return new Date(dateString).toISOString();
}

// Build individual blog post
function buildPost(filename, postTemplate) {
  const filePath = path.join(__dirname, "posts", filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  const slug = createSlug(filename);
  const htmlContent = md.render(content);

  // Generate tags HTML
  const tagsHTML = frontmatter.tags
    ? frontmatter.tags
        .map(
          (tag) => `<span class="blog-tag" itemprop="keywords">${tag}</span>`
        )
        .join("")
    : "";

  // Generate keywords for SEO
  const keywords = [
    ...(frontmatter.tags || []),
    "ViType",
    "gõ tiếng Việt",
    "Vietnamese typing",
  ].join(", ");

  // Replace placeholders in template
  let html = postTemplate
    .replace(/{{TITLE}}/g, frontmatter.title)
    .replace(/{{DESCRIPTION}}/g, frontmatter.description)
    .replace(/{{AUTHOR}}/g, frontmatter.author || "ViType Team")
    .replace(/{{DATE}}/g, formatDate(frontmatter.date))
    .replace(/{{DATE_ISO}}/g, toISODate(frontmatter.date))
    .replace(/{{SLUG}}/g, slug)
    .replace(/{{KEYWORDS}}/g, keywords)
    .replace(/{{TAGS}}/g, (frontmatter.tags || []).join(", "))
    .replace(/{{TAGS_HTML}}/g, tagsHTML)
    .replace(/{{CONTENT}}/g, htmlContent);

  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, "..", "docs", "blog", "posts");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write HTML file
  const outputPath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputPath, html);

  console.log(`✓ Built: ${slug}.html`);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    author: frontmatter.author || "ViType Team",
    date: frontmatter.date,
    dateFormatted: formatDate(frontmatter.date),
    tags: frontmatter.tags || [],
  };
}

// Build blog index page
function buildIndex(posts, indexTemplate) {
  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate post cards HTML
  const postsHTML = posts
    .map((post) => {
      const tagsHTML = post.tags
        .map((tag) => `<span class="blog-tag">${tag}</span>`)
        .join("");

      return `
            <article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">
              <div class="blog-card-content">
                <h2 itemprop="headline">
                  <a href="/blog/posts/${post.slug}.html" itemprop="url">${
        post.title
      }</a>
                </h2>
                <div class="blog-card-meta">
                  <time itemprop="datePublished" datetime="${toISODate(
                    post.date
                  )}">${post.dateFormatted}</time>
                  <span class="meta-separator">•</span>
                  <span itemprop="author" itemscope itemtype="https://schema.org/Person">
                    <span itemprop="name">${post.author}</span>
                  </span>
                </div>
                <p class="blog-card-description" itemprop="description">${
                  post.description
                }</p>
                ${
                  tagsHTML
                    ? `<div class="blog-card-tags">${tagsHTML}</div>`
                    : ""
                }
                <a href="/blog/posts/${post.slug}.html" class="blog-card-link">
                  Đọc tiếp →
                </a>
              </div>
            </article>`;
    })
    .join("\n");

  // Replace placeholder in index template
  const html = indexTemplate.replace(/{{POSTS}}/g, postsHTML);

  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, "..", "docs", "blog");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write index.html
  const outputPath = path.join(outputDir, "index.html");
  fs.writeFileSync(outputPath, html);

  console.log(`✓ Built: blog/index.html`);
}

// Main build function
function build() {
  console.log("🚀 Building blog...\n");

  // Read templates
  const postTemplate = fs.readFileSync(
    path.join(__dirname, "templates", "post.html"),
    "utf8"
  );
  const indexTemplate = fs.readFileSync(
    path.join(__dirname, "templates", "blog-index.html"),
    "utf8"
  );

  // Get all markdown files
  const postsDir = path.join(__dirname, "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.log("⚠️  No blog posts found in blogs/posts/");
    return;
  }

  // Build all posts
  const posts = files.map((file) => buildPost(file, postTemplate));

  // Build index page
  console.log("");
  buildIndex(posts, indexTemplate);

  console.log(`\n✅ Blog build complete! Generated ${posts.length} post(s).`);
}

// Run build
build();
