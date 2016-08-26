/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Location = App.Locaiton || {};
App.Location.LocationController = function () {
    var self = this;
    this.status;
    this.timeStamp;
    this.navAge = 20000;
    this.watchId = 0;

    this.init = function () {
        self.setGeolocMessage().always(self.getposition);

        $('#startMonitoring').on('click', self.beginWatch);
        $('#stopMonitoring').on('click', self.endWatch);
    };

    this.setGeolocMessage = function () {
        this.status = 'geolocation' in navigator;
        var message = ""
        var deferred = $.Deferred()
        if (this.status) {
            message = "Navigation Functions Possible";
            deferred.resolve();
        } else {
            message = "Navigation not found";
            deferred.reject();
        }
        $('#gelocationStatus').html(message);
        return deferred;
    };

    this.showPosition = function (position) {
        var datetime = new Date(position.timestamp).toLocaleString();
        self.timeStamp = datetime;
        $("#locationMessage").html("Continuious polling: " + self.navAge/1000 + " sec <br/> Latitude: " + position.coords.latitude + "<br />"
        + "Longitude: " + position.coords.longitude + "<br />"
        + "Timestamp: " + datetime);
        console.log(position);
    };

    this.getposition = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge:  self.navAge
        };
        navigator.geolocation.getCurrentPosition(self.showPosition, self.showError, options);
        setTimeout(function(){self.getposition();}, options.maximumAge);
    };

    this.showError= function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                self.showMessge("User denied Geolocation access request.");
                break;
            case error.POSITION_UNAVAILABLE:
                self.showMessage("Location information unavailable.");
                break;
            case error.TIMEOUT:
                self.showMessage("Get user location request timed out.");
                break;
            case error.UNKNOWN_ERROR:
                self.showMessage("An unknown error occurred.");
                break;
        }
    }

    this.beginWatch = function () {
        if (self.status) {
            var options = {
                enableHighAccuracy: true
            };
            self.watchId = navigator.geolocation.watchPosition(self.showPosition2, self.showError, options);
        }
        else {
            self.showMessage("Geolocation is not supported by this browser.");
        }
    };

    this.showPosition2= function(position) {
        var datetime = new Date(position.timestamp).toLocaleString();
        self.showMessage("Latitude: " + position.coords.latitude + "<br />"
        + "Longitude: " + position.coords.longitude + "<br />"
        + "Timestamp: " + datetime);

        var mapcanvas = document.getElementById('map');
        var coords = new google.maps.LatLng(position.coords.latitude
        , position.coords.longitude);
        var options = {
            zoom: 13,
            center: coords,
            mapTypeControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapcanvas, options);
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: "You are here!"
        });
    }

    this.endWatch = function () {
        if (self.watchId != 0) {
            navigator.geolocation.clearWatch(self.watchId);
            self.watchId = 0;
           self.showMessage("Monitoring ended.");
        }
    };

    this.showMessage = function (message) {
        $('#message').html(message);
    };

    self.init();
    return self;
};
