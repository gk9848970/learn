import { useQuery } from "@tanstack/react-query";

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

const Posts = () => {
  const posts = usePosts();
  return (
    <div>
      <h1>Posts</h1>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul>
            {posts.data.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const Users = () => {
  const users = useUsers();
  return (
    <div>
      <h1>Users</h1>
      {users.isLoading && <div>Loading</div>}
      {users.isError && <div>Error</div>}
      {users.isSuccess && (
        <>
          <ul>
            {users.data.map((user) => (
              <li key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export function QueryDefaults() {
  return (
    <div>
      <h1>Query Defaults</h1>
      <p>Query defaults are used to set default values for queries.</p>
      <div style={{ display: "flex", gap: 20 }}>
        <Posts />
        <Users />
      </div>
    </div>
  );
}
