/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
App.Home.JQueryController = function () {
    var self = this;

    this.txtInput;
    this.txtResult;

    this.init = function () {
        self.txtInput = $("#txtInput");
        self.txtResult = $("#txtResult");
        self.clear();
    };

    this.clear = function () {
        self.txtInput.val(0);
        self.txtResult.val(0);
    };

    this.buttonEvent = function () {
        $("#buttonId").on()
    }

    return this;
};
