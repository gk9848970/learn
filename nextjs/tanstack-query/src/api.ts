export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
};

export const fetchPosts = async () => {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = (await data.json()) as Post[];
  return posts;
};
