/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
App.Home.CalculatorController = function () {
    var self = this;
    this.txtInput =  $('#txtInput');
    this.txtResult = $('#txtResult');

    this.init = function () {
        //self.txtInput = document.getElementById('txtInput');
        //self.txtResult = document.getElementById('txtResult');

        self.buttonListener();
    };
    this.buttonListener = function () {
        //for (var i = 0; i < 10; i++) {
        //    document.getElementById('btn' + i).addEventListener('click', self.numberClick, false);
        //}
        //document.getElementById("btnPlus").addEventListener('click', self.plusClick, false);
        //document.getElementById("btnMinus").addEventListener('click', self.minusClick, false);
        //document.getElementById("btnClearEntry").addEventListener('click', self.clearEntryClick, false);
        //document.getElementById("btnClear").addEventListener('click', self.clearAllClick, false);
        for (var i = 0; i < 10; i++) {
            $('#btn' + i).on('click', self.numberClick);
        }
        $("#btnPlus").on('click', self.plusClick);
        $("#btnMinus").on('click', self.minusClick);
        $("#btnClearEntry").on('click', self.clearEntryClick);
        $("#btnClear").on('click', self.clearAllClick);
    };

    this.numberClick = function () {
        //self.txtInput.value = self.txtInput.value == '0' ? this.innerText : self.txtInput.value + this.innerText;
        self.txtInput.val(self.txtInput.val() == '0' ? this.innerText : self.txtInput.val() + this.innerText);
    };
    this.plusClick = function () {
        //self.txtResult.value = Number(self.txtResult.value) + Number(self.txtInput.value);
        self.txtResult.val(Number(self.txtResult.val()) + Number(self.txtInput.val()));
        self.clearEntryClick();
    };

    this.minusClick = function () {
        //self.txtResult.value = Number(self.txtResult.value) - Number(self.txtInput.value);
        self.txtResult.val( Number(self.txtResult.val()) - Number(self.txtInput.val()));
        self.clearEntryClick();
    };
    this.clearEntryClick = function () {
        //self.txtInput.value = "";
        self.txtInput.val("");
    };
    this.clearAllClick = function () {
        //self.txtInput.value = "";
        //self.txtResult.value = "";
        self.txtInput.val("");
        self.txtResult.val("");
    };

    self.init();
    return this;
};
