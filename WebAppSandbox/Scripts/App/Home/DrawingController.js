/// <reference path="../../_references.js" />
this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
App.Home.DrawingController = function () {
    var self = this;
    this.canvas = $('#myCanvas')[0];

    this.init = function () {
        self.drawSomething();
        $('#canvasGridControl').on('click', function () { self.addGrid(self.canvas.getContext('2d')) });
        $('#canvasDrawColoredBoxes').on('click', function () { self.drawUsingCssColor() });
        $('#canvasAddGradient').on('click', function () { self.drawGradient() });
        $('#testDraw').on('click', function () { self.testDraw() });
        $('#btnSnapshot').on('click', function () { self.drawVideoFrame() });
    };

    this.drawVideoFrame = function () {
        var canvas = document.getElementById('myCanvasEx');
        var video = document.getElementById('myVideo');
        canvas.getContext('2d').drawImage(video, 0, 0, 360, 240);
    }

    this.drawGradient = function () {
        var canvas = self.canvas,
            ctx = canvas.getContext('2d'),
            x0 = 0,
            y0 = 0, r0 = 0,
            x1 = 200,
            y1 = 0, r1 = 100,
            width = 300, height = 50, offset = 10;

        var gradient = ctx.createLinearGradient(x0, y0, x1, y1);

        self.addColorStops(gradient);
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 0 * (height + offset), width, height);
        ctx.fillRect(100, 1 * (height + offset), width, height);
        y1 = 300;

        gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        self.addColorStops(gradient);
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 2 * (height + offset), width, height);
        ctx.fillRect(100, 3 * (height + offset), width, height);
        x0 = x1 = width / 2;
        y0 = y1 = 4 * (height + offset) + (height / 2);

        gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        self.addColorStops(gradient);
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 4 * (height + offset), width, height);
        ctx.fillRect(100, 5 * (height + offset), width, height);
        y0 = 5 * (height + offset) + (height / 2);
        y1 = y0 + 100;

        gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        self.addColorStops(gradient);
        ctx.fillStyle = gradient;
        ctx.fillRect(10, 6 * (height + offset), width, height);
        ctx.fillRect(100, 7 * (height + offset), width, height);
    };

    this.addColorStops = function (gradient) {
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop(".25", "blue");
        gradient.addColorStop(".50", "green");
        gradient.addColorStop(".75", "yellow");
        gradient.addColorStop("1.0", "red");
    };

    this.drawSomething = function () {
        //var canvas = self.canvas;
        //var ctx = canvas.getContext('2d');
        //ctx.fillRect(10, 50, 100, 200);

        //ctx.moveTo(400, 120);
        //ctx.quadraticCurveTo(200, 200, 200, 120);
        //ctx.stroke();
        ////draw an unfilled rectange startin at x= 400, y=140, with width= 100 height= 100
        //ctx.strokeRect(400, 140, 100, 100);

        //self.addGrid(ctx);

        var canvas = document.getElementById('myCanvas')
, ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.lineTo(150, 250);
        ctx.lineTo(200, 300);
        ctx.rect(100, 300, 100, 100);
        ctx.fill();
        ctx.stroke();
    };

    this.testDraw = function () {
        //var canvas = document.getElementById('myCanvas'),
        //    ctx = canvas.getContext('2d');
        //// create new image object to use as pattern
        //var img = new Image();
        //img.src = "/Content/Images/test2.png";
        //img.onload = function () {
        //    // create pattern
        //    var ptrn = ctx.createPattern(img, 'repeat');
        //    ctx.fillStyle = ptrn;
        //    ctx.fillRect(0, 0, 400, 400);
        //}

        //var canvas = document.getElementById('myCanvas')
        //    , ctx = canvas.getContext('2d')
        //    , offset = 40
        //    , width = 5
        //    , height = 5
        //    , lineWidth = 1
        //    , i = 0
        //    , centerX = canvas.width / 2
        //    , centerY = canvas.height / 2;
        //for (i = 1; i < 15; i++) {
        //    ctx.lineWidth = i;
        //    ctx.strokeRect(centerX - (width / 2) - (i * offset / 2)+8*i,
        //    centerY - (height / 2) - (i * offset / 2),
        //    width + (i * offset), height + (i * offset));
        //}
        var canvas = document.getElementById('myCanvas')
        , ctx = canvas.getContext('2d');
        ctx.lineWidth = 20;
        ctx.lineJoin = 'round';
        ctx.strokeRect(20, 20, 50, 50);
        ctx.lineJoin = 'bevel';
        ctx.strokeRect(100, 100, 50, 50);
        ctx.lineJoin = 'miter';
        ctx.strokeRect(180, 180, 50, 50);
    };

    this.drawUsingCssColor = function () {
        var canvas = document.getElementById('myCanvas')
        , ctx = canvas.getContext('2d')
        , offset = 10
        , size = 50;
        ctx.fillStyle = "red";
        ctx.fillRect(offset + (0 * (offset + size)), offset, size, size);
        ctx.fillRect(offset + (1 * (offset + size)), offset, size, size);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(offset + (2 * (offset + size)), offset, size, size);
        ctx.fillRect(offset + (3 * (offset + size)), offset, size, size);
        ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
        ctx.fillRect(offset + (4 * (offset + size)), offset, size, size);
        ctx.fillRect(offset + (5 * (offset + size)), offset, size, size);
    };

    this.addGrid = function (ctx) {
        var canvasJQ = $('#myCanvas');
        var canvasWidth = canvasJQ.width();
        var canvasHeight = canvasJQ.height();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        //zero zero
        ctx.beginPath();
        ctx.moveTo(15, 15);
        ctx.arc(15, 15, 6, 0, 2 * Math.PI, false);
        ctx.stroke();
        for (var i = 0; i < canvasWidth; i += 10) {
            ctx.strokeRect(i, 0, 1, 5);
        };

        for (var i = 0; i < canvasWidth; i += 100) {
            ctx.strokeRect(i, 0, 1, 10);
        };
        for (var i = 0; i < canvasHeight; i += 10) {
            ctx.strokeRect(0, i, 5, 1);
        };

        for (var i = 0; i < canvasHeight; i += 100) {
            ctx.strokeRect(0, i, 10, 1);
        };
    };

    self.init();
    return self;
};
