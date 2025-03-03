import { QueryObserver } from "@tanstack/query-core";

$.widget("custom.useQuery", {
  _create() {
    this._observer = new QueryObserver(
      this.options.queryClient,
      this.options.queryOptions
    );

    this._unsubscribe = this._observer.subscribe(() => {
      const result = this._observer.getCurrentResult();
      this._trigger("update", null, result);
    });
  },

  _destroy() {
    this._unsubscribe();
  },
});
