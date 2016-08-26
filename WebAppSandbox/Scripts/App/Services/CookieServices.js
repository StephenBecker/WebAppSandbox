/// <reference path="../_references.js" />
this.App = this.App || {};
var app = this.App;
app.Services = app.Services || {};

app.Services.CookieServices = function () {
    var self = this;

    this.getCookie = function (cookieName) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var index = cookie.indexOf("=");
            var key = cookie.substr(0, index).trim();
            var val = cookie.substr(index + 1).trim();
            if (key == cookieName)
                return val;
        }
    };

    this.getAllCookies = function () {
        return document.cookie;
    };

    this.setCookie = function (cookieName, cookieValue, expirationDays) {
        var expirationDate = new Date();
        expirationDate.setUTCMilliseconds(expirationDate.getUTCMilliseconds() + (expirationDays * 86400000));
        cookieValue = cookieValue + "; expires=" + expirationDate.toUTCString();
        document.cookie = cookieName + "=" + cookieValue;
    };

    this.destroyAllCookies = function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var index = cookie.indexOf("=");
            var key = cookie.substr(0, index).trim();
            self.setCookie(key, "", -1);
        }
    };
    return self;
};
