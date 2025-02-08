import { useQueries, useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data.splice(0, 10);
};

const fetchUsers = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  return data;
};

const fetchComments = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const data = await response.json();
  return data;
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

export function ParallelQueryStatic1() {
  const posts = usePosts();
  const users = useUsers();

  return (
    <div>
      <h1>Posts</h1>
      {posts.isPending && <div>Loading</div>}
      {posts.isError && <div>Error posts</div>}
      {posts.isSuccess &&
        posts.data.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      {}
      <h1>Users</h1>
      {users.isPending && <div>Loading</div>}
      {users.isError && <div>Error users</div>}
      {users.isSuccess &&
        users.data.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
}

const usePostsAndUsers = () => {
  return useQuery({
    queryKey: ["postsAndUsers"],
    queryFn: () => Promise.all([fetchPosts(), fetchUsers()]),
  });
};

export function ParallelQueryStatic2() {
  const repoAndUsers = usePostsAndUsers();

  return (
    <div>
      {repoAndUsers.isPending && <div>Loading</div>}
      {repoAndUsers.isError && <div>Error</div>}
      {repoAndUsers.isSuccess && (
        <>
          <h1>Posts</h1>
          {repoAndUsers.data[0].map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
          <h1>Users</h1>
          {repoAndUsers.data[1].map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const usePostsAndUsers2 = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: fetchPosts,
      },
      {
        queryKey: ["users"],
        queryFn: fetchUsers,
      },
    ],
  });
};

export const ParallelQueryStatic3 = () => {
  const [posts, users] = usePostsAndUsers2();

  const isAnyPending = [posts, users].some((query) => query.isPending);

  if (isAnyPending) {
    return <div>Loading</div>;
  }

  console.log(posts, users);

  return (
    <div>
      {posts.isPending && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <h1>Posts</h1>
          {posts.data.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </>
      )}
      {users.isPending && <div>Loading</div>}
      {users.isError && <div>Error</div>}
      {users.isSuccess && (
        <>
          <h1>Users</h1>
          {users.data.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const useCommentsFromPosts = (posts?: any[]) => {
  // Can also use combine to modify what does this hook returns, And number of comments can be done inside hook only
  return useQueries({
    queries:
      posts?.map((post) => ({
        queryKey: ["posts", "comments", post.id],
        queryFn: async () => {
          const response = await fetchComments(post.id);
          return { postId: post.id, comments: response };
        },
      })) ?? [],
  });
};

export const ParallelQueryStatic4 = () => {
  const posts = usePosts();
  const comments = useCommentsFromPosts(posts.data);

  /*
   This cannot be done if we render something like <PostComponent posts={post} />,
   And then fetch comment inside of it using useCommentsFromPosts(post.id)
   */
  const totalNumberOfComments = comments.reduce(
    (acc, query) => acc + (query?.data?.comments?.length ?? 0),
    0
  );

  return (
    <div>
      <h1>Total number of comments: {totalNumberOfComments}</h1>
      <h2>Posts</h2>
      {posts.isPending && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul>
            {posts.data.map((post) => {
              const postComments = comments.find(
                (query) => query?.data?.postId === post.id
              );

              const numberOfComments =
                postComments?.data?.comments?.length ?? 0;

              return (
                <li key={post.id}>
                  <div>Title: {post.title}</div>
                  <div>Number of comments: {numberOfComments}</div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
