/// <reference path="../_references.js" />
this.App = this.App || {};
var app = this.App;
app.Services = app.Services || {};

app.Services.WebSocketServices = function (websocketurl) {
    var self = this;
    this.webSocketUrl = websocketurl;
    this.webSocket = window.WebSocket || window.MozWebsocket;
    this.ws;

    this.init = function () {
        self.ws = new self.webSocket(self.webSocketUrl);
        self.log('Establishing connection...');
        self.ws.onopen = self.alertOpen;
        self.ws.onclose = self.alertClose;
        self.ws.onmessage = self.alertMessage;
        self.ws.onerror = self.alertError;
    };

    this.log = function (msg) {
        $("#log").append('<li>' + msg + '</li>');
    }
    this.alertOpen = function () {
        self.log('Connection open.');
    };

    this.alertClose = function () {
        self.log('Connection closed.')
    };

    this.alertMessage = function (e) {
        self.log('Server: ' + e.data);
    };

    this.alertError = function (e) {
        self.log('Error: ' + e)
    };
    this.sendMessage = function (msg) {
        self.ws.send(msg);
    }

    return self;
}
