import { lazy, Suspense, useState } from "react";
import { useInView } from "react-intersection-observer";

const LazyPost = lazy(() => import("../../../components/post"));

export const IntersectionObserverLazyLoading = () => {
  const [showPost, setShowPost] = useState(false);

  const handleIntersect = (inView: boolean) => {
    if (inView) {
      setShowPost(true);
    }
  };

  const { ref } = useInView({ onChange: handleIntersect, threshold: 0 });

  return (
    <div>
      <div style={{ height: "5000px", background: "pink" }}>I am long</div>

      <div ref={ref}>
        {showPost ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyPost />
          </Suspense>
        ) : (
          <div>Not loading</div>
        )}
      </div>
    </div>
  );
};
