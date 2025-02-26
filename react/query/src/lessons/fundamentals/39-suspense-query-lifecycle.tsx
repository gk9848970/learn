import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchPosts = async () => {
  console.log("fetching posts");
  await delayPromise(5000);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  console.log("fetched posts");
  return data.splice(0, 10);
};

const fetchUsers = async () => {
  console.log("fetching users");
  await delayPromise(500);
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  console.log("fetched users");
  return data;
};

const usePosts = () =>
  useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

const useUsers = () =>
  useSuspenseQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

const Posts = () => {
  console.log("Rendering posts before suspense");
  const posts = usePosts();
  console.log("Rendering posts after suspense");
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  console.log("Rendering users before suspense");
  const users = useUsers();
  console.log("Rendering users after suspense");
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

/*
Entire component tree remains suspended until all queries are resolved.
Fetching for both happens in parallel as it is like rendering different components.

For suspense inside suspense
The inner suspense query also runs in parallel with the outer suspense query.
Even if inner suspense query is resolved but outer is pending, We will see outer suspense fallback.
If inner suspense query takes more time, The outer will show it's own data and the inner will show fallback.
*/

export function SuspenseQueriesLifeCycle() {
  return (
    <div>
      <h1>Query Defaults</h1>
      <p>Suspension of Queries</p>
      <div style={{ display: "flex", gap: 20 }}>
        <Suspense fallback={<div>Loading... Posts</div>}>
          <Posts />
        </Suspense>
        <Suspense fallback={<div>Loading... Users</div>}>
          <Users />
        </Suspense>

        {/* 
        <Suspense fallback={<div>Loading... Posts</div>}>
            <Posts />
            <Suspense fallback={<div>Loading... Users</div>}>
                <Users />
            </Suspense>
        </Suspense>
        */}
      </div>
    </div>
  );
}
