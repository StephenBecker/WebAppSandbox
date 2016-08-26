App = App || {};
App.Tested = function () {
    var self = this;
    this.greeting = "Hello World"

    this.init = function () {
    };

    this.getAreaOfPizzaSlice = function (diameter, slicesPerPizza) {
        return self.areaOfPizza(diameter) / slicesPerPizza;
    };

    this.areaOfPizza = function (diameter) {
        var radius = diameter / 2;
        return 3.141592 * radius * radius;
    };

    this.init();
    return this;
};
