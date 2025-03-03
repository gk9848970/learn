$.widget("custom.simpleWidget", {
  _create: function () {
    console.log("welcome");
    this.options.div.appendTo(this.element);
  },

  _destroy: function () {
    console.log("Destroyed");
    this.options.div.remove();
  },
});
