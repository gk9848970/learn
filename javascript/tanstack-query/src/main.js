import "./simpleWidget";

$(document).ready(function () {
  console.log("jQuery is working!");

  const destroyButton = $("<button>Unmount Widget</button>");
  destroyButton.on("click", function () {
    $("#app").simpleWidget("destroy");
  });

  const createButton = $("<button>Mount Widget</button>");
  createButton.on("click", function () {
    $("#app").simpleWidget({
      div: $("<div>Hello from jQuery + Vite!</div>"),
    });
  });

  $("#app").append(destroyButton);
  $("#app").append(createButton);
});
