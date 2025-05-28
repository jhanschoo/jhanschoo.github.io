import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

export async function GET({ site }: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: site!,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
