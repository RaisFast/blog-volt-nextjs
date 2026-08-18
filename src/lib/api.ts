import { client } from "./raisfast";
import type {
  PostResponse,
  PaginatedData,
  Category,
  Tag,
  CommentResponse,
} from "@raisfast/sdk";

const emptyPage = <T,>(): PaginatedData<T> => ({
  items: [],
  total: 0,
  page: 1,
  page_size: 12,
});

export const api = {
  posts: async (page = 1, pageSize = 12): Promise<PaginatedData<PostResponse>> => {
    try {
      return await client.posts.list({ page, page_size: pageSize });
    } catch {
      return emptyPage<PostResponse>();
    }
  },

  post: async (slug: string): Promise<PostResponse | null> => {
    try {
      return await client.posts.get(slug);
    } catch {
      return null;
    }
  },

  categories: async (): Promise<Category[]> => {
    try {
      const data = await client.categories.list(1, 100);
      return data.items;
    } catch {
      return [];
    }
  },

  categoryPosts: async (slug: string, page = 1): Promise<PaginatedData<PostResponse>> => {
    try {
      const cats = await client.categories.list(1, 100);
      const cat = cats.items.find((c) => c.slug === slug);
      if (!cat) return emptyPage<PostResponse>();
      return await client.posts.list({ category_id: cat.id, page, page_size: 12 });
    } catch {
      return emptyPage<PostResponse>();
    }
  },

  tags: async (): Promise<Tag[]> => {
    try {
      const data = await client.tags.list(1, 100);
      return data.items;
    } catch {
      return [];
    }
  },

  tagPosts: async (slug: string, page = 1): Promise<PaginatedData<PostResponse>> => {
    try {
      const tagList = await client.tags.list(1, 100);
      const tag = tagList.items.find((t) => t.slug === slug);
      if (!tag) return emptyPage<PostResponse>();
      return await client.posts.list({ tag_id: tag.id, page, page_size: 12 });
    } catch {
      return emptyPage<PostResponse>();
    }
  },

  comments: async (postSlug: string): Promise<PaginatedData<CommentResponse>> => {
    try {
      return await client.comments.list(postSlug, 1, 100);
    } catch {
      return emptyPage<CommentResponse>();
    }
  },

  info: async () => ({
    name: "VOLT",
    description: "A brutalist blog powered by RaisFast",
    logo: "",
    url: "",
  }),

  search: async (q: string, page = 1): Promise<PaginatedData<PostResponse>> => {
    try {
      return await client.send<PaginatedData<PostResponse>>(
        `/posts?search=${encodeURIComponent(q)}&page=${page}&page_size=12`,
      );
    } catch {
      return emptyPage<PostResponse>();
    }
  },
};
