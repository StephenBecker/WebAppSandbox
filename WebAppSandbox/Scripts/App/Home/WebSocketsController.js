/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
App.Home.WebSocketController = function () {
    var self = this;
    var controller = App.Home.WebSocketController;

    this.wsUri = 'ws://echo.websocket.org/';
    this.webSocket;
    this.timerId = 0;

    this.init = function () {
        if (self.checkSupported()) {
            self.connect();
            $('#btnSend').click(function () { self.doSend() });
        }
        $('#webSocketDatasend').click(function () { self.sendMessage() });
        $('#webSocketData').keypress(function () { self.processEnterPress(this.dispatchEvent) });
    };
    controller.websocket = function () { return self.webSocket; };
    /*
     * begin socketio
     */

    this.socket;

    self.socket = io.connect('http://localhost:8080');
    self.socket.on('connect', function () { self.addUser() });
    self.socket.on('updatechat', function (username, data) { self.processMessage(username, data) });
    self.socket.on('updateusers', function (data) { self.updateUserList(data) });
    $('#datasend').click(function () { self.sendMessage() });
    $('#data').keypress(function (e) { self.processEnterPress(e) });

    this.addUser = function() {
        self.socket.emit('adduser', prompt("What's your name?"));
    }
    this.processMessage = function(username, data) {
        $('<b>' + username + ':</b> ' + data + '<br />')
        .insertAfter($('#conversation'));
    }
    this.updateUserList = function(data) {
        $('#users').empty();
        $.each(data, function (key, value) {
            $('#users').append('<div>' + key + '</div>');
        });
    }
    this.sendMessage= function() {
        var message = $('#data').val();
        $('#data').val('');
        self.socket.emit('sendchat', message);
        $('#data').focus();
    }
    this.processEnterPress= function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).blur();
            $('#datasend').focus().click();
        }
    }
    ///*
    // * end socket Io
    // */

    this.checkSupported = function () {
        if (window.WebSocket) {
            self.writeOutput('WebSockets supported!');
            return true;
        }
        else {
            self.writeOutput('WebSockets NOT supported');
            $('#btnSend').attr('disabled', 'disabled');
            return false;
        }
    };

    this.connect = function () {
        self.webSocket = new WebSocket(self.wsUri);
        self.webSocket.onopen = function (evt) { self.onOpen(evt) };
        self.webSocket.onclose = function (evt) { self.onClose(evt) };
        self.webSocket.onmessage = function (evt) { self.onMessage(evt) };
        self.webSocket.onerror = function (evt) { self.onError(evt) };
    };

    this.writeOutput = function (message) {
        var output = $("#divOutput");
        output.html(output.html() + '<br />' + message);
    };

    this.doSend = function () {
        if (self.webSocket.readyState != self.webSocket.OPEN) {
            self.writeOutput("NOT OPEN: " + $('#txtMessage').val());
            return;
        }
        self.writeOutput("SENT: " + $('#txtMessage').val());
        self.webSocket.send($('#txtMessage').val());
    }
    this.onOpen = function (evt) {
        self.writeOutput("CONNECTED");
        self.keepAlive();
    }
    this.onClose = function (evt) {
        self.cancelKeepAlive();
        self.writeOutput("DISCONNECTED");
    }
    this.onMessage = function (evt) {
        self.writeOutput('RESPONSE: ' + evt.data);
    }
    this.onError = function (evt) {
        self.writeOutput('ERROR: ' + evt.data);
    }

    this.keepAlive = function () {
        var timeout = 15000;
        if (self.webSocket.readyState == self.webSocket.OPEN) {
            self.webSocket.send('');
        }
        self.timerId = setTimeout(self.keepAlive, timeout);
    }

    this.cancelKeepAlive = function () {
        if (self.timerId) {
            cancelTimeout(self.timerId);
        }
    }

    self.init();
    return self;
};
