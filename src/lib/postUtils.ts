import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  return posts
    .filter(({ data: { draft } }) => !draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPosts();
  return posts.reduce((acc, post) => {
    post.data.tags?.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());
}
