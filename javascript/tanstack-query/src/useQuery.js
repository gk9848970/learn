import { QueryObserver } from "@tanstack/query-core";

$.widget("custom.useQuery", {
  _create() {
    // Add browser events - Fetchon windo refocus, network status change, etc
    this.options.queryClient.mount();
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
    this.options.queryClient.unmount();
    this._unsubscribe();
  },
});
