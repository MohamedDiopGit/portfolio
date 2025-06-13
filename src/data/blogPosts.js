import matter from "gray-matter";

// Utilise la nouvelle syntaxe recommandée par Vite
const modules = import.meta.glob('../blog-posts/*.md?raw', { eager: true, import: 'default' });

const blogPosts = Object.entries(modules).map(([path, rawContent]) => {
  const { data, content } = matter(rawContent);
  const slug = path.split('/').pop().replace('.md', '');
  return {
    slug,
    title: data?.title || slug,
    date: data?.date || "",
    content,
  };
});

export default blogPosts;