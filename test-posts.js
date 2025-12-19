import { getCollection } from "astro:content";

async function test() {
  try {
    const posts = await getCollection("posts");
    console.log("Total posts found:", posts.length);
    posts.forEach(post => {
      console.log("Slug:", post.slug);
      console.log("  Title:", post.data.title);
      console.log("  Published:", post.data.published);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

test();