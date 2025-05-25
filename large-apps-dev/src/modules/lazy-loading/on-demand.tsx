import { lazy, useState } from "react";

const LazyPost = lazy(() => import("../../components/post"));

export const OnDemandLazyLoad = () => {
  const [showPost, setShowPost] = useState(false);

  return (
    <div>
      {showPost ? <LazyPost /> : null}
      <button onClick={() => setShowPost(!showPost)}>Toggle</button>
    </div>
  );
};
