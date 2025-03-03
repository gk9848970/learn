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
      // Now update will only run if result gets changed, Even if a refetch happens
      this._trigger("update", null, this._observer.trackResult(result));
    });
  },

  _setOption(key, value) {
    this._super(key, value);

    if (key === "queryOptions") {
      this._observer.setOptions(value);
    }
  },

  _destroy() {
    this.options.queryClient.unmount();
    this._unsubscribe();
  },
});
