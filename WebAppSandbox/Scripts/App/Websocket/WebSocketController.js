/// <reference path="../../_references.js" />
this.App = this.App || {};
var app = this.App;
app.WebSocket = app.WebSocket || {};
app.WebSocket.WebSocketController = function (webSocketService) {
    var self = this;
    this.WebSocketService = webSocketService;

    this.init = function () {
        self.WebSocketService.init();
        $('#messageBoxWebsocket').change(function () {
            self.WebSocketService.sendMessage(this.value);
        });
    };

    self.init();
    return self;
}
