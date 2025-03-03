export type Post = {
  id: number;
  title: string;
};

export const fetchPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = (await data.json()) as Post[];
  return posts;
};
