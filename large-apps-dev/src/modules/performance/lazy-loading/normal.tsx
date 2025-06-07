import { lazy, Suspense } from "react";

const LazyPost = lazy(() => import("../../../components/post"));

export const NormalLazyLoad = () => {
  return (
    <Suspense fallback="loading">
      <LazyPost />
    </Suspense>
  );
};
