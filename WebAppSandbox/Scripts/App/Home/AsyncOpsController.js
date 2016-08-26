/// <reference path="../../_references.js" />

//namespace matainance
this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
//controller definiton
App.Home.AsyncOpsController = function () {
    //variables
    var self = this;
    var cont = App.Home.AsyncOpsController;
    this.milliseconds = 1000;
    this.opacity = 0.5;

    //public methods
    cont.abcAsync = function () { self.abcAsync(); };
    cont.abcAsync2prom = function () { self.abcAsync2prom(); };
    cont.promisesX4 = function () { self.promisesX4(); };
    cont.parallellAsyncWhen = function () { self.parallellAsyncWhen(); };
    cont.runAbcAsync = function () { self.runAbcAsync(); };
    cont.setOpacity = function (val) { self.opacity = val; };
    cont.setMili = function (val) { self.milliseconds = val; };

    //private/encapsulated methods

    //init
    this.init = function () {
        $('#btnShowMessage').click(function () { self.displayTimeAsync() });
        $('#messageOk').click(function () { self.hideMessageAsync(); });
    };

    this.hideMessageAsync = function () {
        var messagePromise = self.hideMessageContentAsync();
        var coverPromise = messagePromise.pipe(function () {
            return self.hideCoverAsync();
        });
        return coverPromise;
    };

    this.hideCoverAsync = function () {
        return $('#cover').fadeOut(self.milliseconds).promise();
    };

    this.hideMessageContentAsync = function (message) {
        var promise = $('#messageContent').slideUp(self.milliseconds).promise();
        promise.done(function () { $('#messageBox').hide(); });
        return promise;
    };

    this.showMessageAsync = function (message) {
        var coverPromise = self.displayCoverAsync();
        var messagePromise = coverPromise.pipe(function () {
            return self.showMessageContentAsync(message);
        });
        return messagePromise;
    };

    this.displayTimeAsync = function () {
        var message = 'The time is now ' + self.getTime();
        return self.showMessageAsync(message);
    };
    this.getTime = function () {
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        return hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
    };

    this.showMessageContentAsync = function (message) {
        $('#message').html(message);
        $('#messageBox').show();
        return $('#messageContent').slideDown(self.milliseconds).promise();
    };

    this.displayCoverAsync = function () {
        return $('#cover').fadeTo(self.milliseconds, self.opacity).promise();
    };

    this.timeoutAsync = function (milliseconds) {
        var deferred = $.Deferred();
        setTimeout(function () { deferred.resolve(); }, milliseconds);
        return deferred.promise();
    };

    this.abcAsync = function () {
        var promise = self.timeoutAsync(2000);
        promise.always(function () { alert('always!') });
        promise.done(function () { alert('done!') });
        promise.fail(function () { alert('failed!') });
        return promise;
    };

    this.abcAsync2prom = function () {
        var firstPromise = self.timeoutAsync(2000);
        var secondPromise = self.timeoutAsync(1000);

        firstPromise.done(function () {
            console.info("in first promise done");
            firstPromise.done(function () { alert('done1!') });
        });

        secondPromise.done(function () {
            console.info("second promise done");
            firstPromise.done(function () { alert('done2!') });
        });
        return firstPromise;
    };

    this.promisesX4 = function () {
        var firstPromise = self.timeoutAsync(2000);
        var secondPromise = firstPromise.pipe(function () {
            return self.timeoutAsync(3000);
        });
        var thirdPromise = secondPromise.pipe(function () {
            return self.timeoutAsync(1000);
        });
        var fourthPromise = thirdPromise.pipe(function () {
            return self.timeoutAsync(1234);
        });

        firstPromise.done(function () { console.info("1st promise done") });
        secondPromise.done(function () { console.info("2nd promise done") });
        thirdPromise.done(function () { console.info("3rd promise done") });
        fourthPromise.done(function () { console.info("4th promise done") });

        fourthPromise.done(function () {
            firstPromise.done(function () { alert('done!') });
        });

        return fourthPromise;
    };

    this.parallellAsyncWhen = function () {
        var deferred = $.Deferred();
        var count = 0;
        var firstPromise = self.timeoutAsync(1000);
        var secondPromise = self.timeoutAsync(1500);
        var thirdPromise = self.timeoutAsync(2000);
        var fourthPromise = self.timeoutAsync(3000);

        firstPromise.done(function () { console.info("1st promise done") });
        secondPromise.done(function () { console.info("2nd promise done") });
        thirdPromise.done(function () { console.info("3rd promise done") });
        fourthPromise.done(function () { console.info("4th promise done") });

        firstPromise.always(function () { deferred.notify(++count); });
        secondPromise.always(function () { deferred.notify(++count); });
        thirdPromise.always(function () { deferred.notify(++count); });
        fourthPromise.always(function () { deferred.notify(++count); });

        $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
        .then(function () { alert('done!'); deferred.resolve(); },
        function () { deferred.reject(); });
        return deferred.promise();
    };

    this.runAbcAsync = function () {
        var promise = self.parallellAsyncWhen();
        promise.progress(function (msg) { alert(msg); });
        return promise;
    };

    this.init();
    return self;
};
