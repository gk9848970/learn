export type Post = {
  id: number;
  title: string;
};

export const fetchPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = (await data.json()) as Post[];
  return posts;
};

const PER_PAGE_LIMIT = 8;

export const fetchPaginatedPosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PER_PAGE_LIMIT}`
  );
  const data = (await response.json()) as Post[];
  return data;
};
