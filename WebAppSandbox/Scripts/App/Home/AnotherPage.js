/// <reference path="../../_references.js" />
this.App = this.App || {};
var App = this.App || {};
App.Home = App.Home || {};
App.Home.AnotherPage = function () {
    var self = this;
    var controller = App.Home.AnotherPage

    this.init = function () {
        window.id = "window";
        window.addEventListener('click', self.EventAlert, false);
        window.addEventListener('click', self.EventAlert, true);

        var btn = document.getElementById("buttonToTest");

        btn.addEventListener('click', self.EventAlert, false);
        btn.addEventListener('click', self.EventAlert, true);

        var oDiv = document.getElementById("outerDiv");
        oDiv.addEventListener('click', self.EventAlert, false);
        oDiv.addEventListener('click', self.EventAlert, true);
        var iDiv = document.getElementById("innerDiv");
        iDiv.addEventListener('click', self.EventAlert, true);
        iDiv.addEventListener('click', self.stopAlert, false);
    };

    this.EventAlert = function () {
        alert(this.id);
    };

    this.stopAlert = function (e) {
        alert(e.toString());
        e.stopPropagation();
    };

    controller.makeVheicle = function (year, make, model) {
        return self.Vehicle(year, make, model);
    }

    this.init();
    return this;
};

var Vehicle = (function () {
    function Vehicle(year, make, model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }
    Vehicle.prototype.getInfo = function () {
        return this.year + ' ' + this.make + ' ' + this.model;
    };
    Vehicle.prototype.startEngine = function () {
        return 'Vroom';
    };
    return Vehicle;
})();

var Car = (function (parent) {
    Car.prototype = new Vehicle();
    Car.prototype.constructor = Car;
    function Car(year, make, model) {
        parent.call(this, year, make, model);
        this.wheelQuantity = 4;
    }
    return Car;
})(Vehicle)

App.Calc = function (value) {
    var self = this;
    this.value = value || 0;

    this.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            self.value = self.value + arguments[i];
        }

        return self;
    };
    this.multiply = function (x) {
        self.value = self.value * x;
        return self;
    };
    this.equals = function (callback) {
        callback = callback || console.info;
        callback(self.value);
        return self;
    };
};

App.Fibon = function (numbers) {
    var array = [];
    for (var i = 0;i<=numbers;i++){
        if(i== 0){
            array.push(0);
        }else if(i==1){
                array.push(1);
        }else{
            array.push(array[i-1]+array[i-2]);
        }
        console.info(array[i]);
    }
    console.info(array);
}
