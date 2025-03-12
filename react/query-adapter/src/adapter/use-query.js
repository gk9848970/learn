// import { useEffect, useState } from "react";
// import { useQueryClient } from "./query-client-provider";

// // queryClient,
// //       queryOptions: {
// //         queryKey: ["posts"],
// //         queryFn: async () => {
// //           const response = await fetch(
// //             "https://jsonplaceholder.typicode.com/posts/1"
// //           );
// //           return await response.json();
// //         },
// //         // After 5 seconds, We will receive a new update as isStale becomes true now
// //         staleTime: 1000 * 5,
// //       },
// //       update: (_event, { status, error, data }) => {
// //         if (status === "pending") {
// //           $("#app").append("<h1>Loading...</h1>");
// //         } else if (status === "error") {
// //           $("#app").append(`<h1>Error: ${error}</h1>`);
// //         } else {
// //           console.log(data);
// //           $("#app").append(`<h1>Success: ${data.title} posts</h1>`);
// //         }
// //       },

// import { QueryObserver } from "@tanstack/query-core";

// // $.widget("custom.useQuery", {
// //   _create() {
// //     // Add browser events - Fetchon windo refocus, network status change, etc
// //     this.options.queryClient.mount();
// //     this._observer = new QueryObserver(
// //       this.options.queryClient,
// //       this.options.queryOptions
// //     );

// //     this._unsubscribe = this._observer.subscribe(() => {
// //       const result = this._observer.getCurrentResult();
// //       // Now update will only run if result gets changed, Even if a refetch happens
// //       this._trigger("update", null, this._observer.trackResult(result));
// //     });
// //   },

// //   _setOption(key, value) {
// //     this._super(key, value);

// //     if (key === "queryOptions") {
// //       this._observer.setOptions(value);
// //     }
// //   },

// //   _destroy() {
// //     this.options.queryClient.unmount();
// //     this._unsubscribe();
// //   },
// // });

// export const useQuery = ({ queryKey, queryFn, ...options }) => {
//   const queryClient = useQueryClient();
//   const [query, setQuery] = useState(undefined);

//   useEffect(() => {
//     const _observer = new QueryObserver(queryClient, {
//       queryKey,
//       queryFn,
//       ...options,
//     });

//     const _unsubscribe = _observer.subscribe(() => {
//       const result = _observer.getCurrentResult();
//       console.log(result);
//     });

//     return () => {
//       _unsubscribe();
//     };
//   }, [options, queryClient, queryFn, queryKey]);

//   return query;
// };
