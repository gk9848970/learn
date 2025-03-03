import "./useQuery";
import { QueryClient } from "@tanstack/query-core";

$(document).ready(function () {
  console.log("jQuery is working!");
  const queryClient = new QueryClient();

  const destroyButton = $("<button>Unmount Widget</button>");
  destroyButton.on("click", function () {
    $("#app").useQuery("destroy");
  });

  const createButton = $("<button>Mount Widget</button>");
  createButton.on("click", function () {
    $("#app").useQuery({
      queryClient,
      queryOptions: {
        queryKey: ["posts"],
        queryFn: async () => {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
          );
          return await response.json();
        },
        // After 5 seconds, We will receive a new update as isStale becomes true now
        staleTime: 1000 * 5,
      },
      update: (_event, { status, error, data }) => {
        if (status === "pending") {
          $("#app").append("<h1>Loading...</h1>");
        } else if (status === "error") {
          $("#app").append(`<h1>Error: ${error}</h1>`);
        } else {
          console.log(data);
          $("#app").append(`<h1>Success: ${data.title} posts</h1>`);
        }
      },
    });
  });

  $("#app").append(destroyButton);
  $("#app").append(createButton);
});
