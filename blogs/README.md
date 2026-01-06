# ViType Blog System

This directory contains the source files for the ViType blog system. The blog uses Markdown for content creation and automatically generates SEO-optimized HTML pages.

## Quick Start

### Writing a New Blog Post

1. Create a new `.md` file in the `posts/` directory:

   ```bash
   touch posts/my-new-post.md
   ```

2. Add frontmatter and content:

   ```markdown
   ---
   title: "Your Post Title"
   date: "2026-01-05"
   author: "Your Name"
   description: "A brief description for SEO (150-160 chars)"
   tags: ["ViType", "Tutorial", "MacOS"]
   ---

   # Your Content Here

   Write your blog post in Markdown...
   ```

3. Build the blog:

   ```bash
   npm run build:blog
   ```

4. The generated HTML files will be in `../docs/blog/`

## Directory Structure

```
blogs/
├── posts/              # Your Markdown blog posts
├── templates/          # HTML templates (don't edit unless needed)
│   ├── post.html      # Individual post template
│   └── blog-index.html # Blog listing template
├── build.js           # Build script
└── README.md          # This file
```

## Frontmatter Fields

All fields are required for proper SEO:

- **title**: Blog post title (shown in browser tab and post header)
- **date**: Publication date in YYYY-MM-DD format
- **author**: Author name (defaults to "ViType Team")
- **description**: SEO meta description (150-160 characters ideal)
- **tags**: Array of tags for categorization

## Markdown Features

### Supported Syntax

- **Headings**: `#`, `##`, `###`, etc.
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: `[text](url)`
- **Lists**: Ordered and unordered
- **Code blocks**: With syntax highlighting
- **Blockquotes**: `> quote`
- **Tables**: Markdown tables
- **Images**: `![alt](path)`

### Code Syntax Highlighting

Use fenced code blocks with language identifier:

````markdown
```javascript
const greeting = "Hello ViType!";
```
````

Supported languages: JavaScript, Python, Swift, Java, CSS, HTML, Bash, and more.

## Build Process

The build script (`build.js`):

1. Reads all `.md` files from `posts/`
2. Parses YAML frontmatter
3. Converts Markdown to HTML
4. Injects content into templates
5. Generates syntax highlighting
6. Creates heading anchors
7. Outputs HTML to `../docs/blog/`
8. Generates blog index page

## SEO Features

Each blog post automatically includes:

- ✅ Optimized meta tags
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ JSON-LD structured data (BlogPosting schema)
- ✅ Breadcrumb navigation
- ✅ Canonical URLs
- ✅ Mobile-optimized

## Best Practices

### Writing

- Keep titles under 60 characters
- Write descriptions between 150-160 characters
- Use descriptive filenames (they become URLs)
- Add 3-5 relevant tags
- Use proper heading hierarchy (H1 → H2 → H3)

### SEO

- Include keywords naturally in title and description
- Use descriptive alt text for images
- Link to relevant internal pages
- Keep paragraphs concise
- Use lists and headings to break up content

### File Naming

- Use lowercase
- Use hyphens for spaces: `my-blog-post.md`
- Be descriptive: `vitype-tips-for-developers.md`
- Avoid special characters

## Example Post

See `posts/welcome-to-vitype-blog.md` for a complete example showing all Markdown features.

## Deployment

After building:

```bash
git add .
git commit -m "Add new blog post"
git push
```

GitHub Pages will automatically deploy your changes.

## Troubleshooting

### Build fails

- Check that all frontmatter fields are present
- Verify YAML syntax (proper indentation, quotes)
- Ensure date is in YYYY-MM-DD format

### Post doesn't appear

- Make sure the file is in `posts/` directory
- Check that filename ends with `.md`
- Run `npm run build:blog` again

### Tags not showing

- Ensure tags is an array: `tags: ["tag1", "tag2"]`
- Don't forget the square brackets

## Need Help?

- Check the example post: `posts/welcome-to-vitype-blog.md`
- View generated HTML: `../docs/blog/`
- See the walkthrough artifact for detailed documentation
