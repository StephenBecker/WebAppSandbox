/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};

App.Home.VideoPageController = function () {
    var self = this;

    this.init = function () {
        $('#play').on('click', function () { self.playStop()});
        $('#media').on('play', function () { $('#play').html('Pause'); });
        $('#media').on('pause', function () { $('#play').html('Play'); });
    };
    this.playStop= function() {
        var media = $('#media')[0];
        if (media.paused) {
            media.play();
        }
        else {
            media.pause();
        }
    }

    self.init();
    return self;
};
