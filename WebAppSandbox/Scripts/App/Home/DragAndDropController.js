/// <reference path="../../_references.js" />

this.App = this.App || {};
var App = this.App;
App.Home = App.Home || {};
App.Home.DragAndDropController = function () {
    var self = this;
    this.squareCount = 16;
    this.emptySquare;

    this.init = function () {
        /*
         * w/o data transfer object
         */
        $('.item').on('dragstart', self.dragging);
        $('.item').on('dragend', self.draggingEnded);
        $('.hole').on('dragenter', self.preventDefault);
        $('.hole').on('dragover', self.preventDefault);
        $('.hole').on('drop', self.dropItem);

        /*
         * using data transfer object
         */
        jQuery.event.props.push('dataTransfer');
        $('#carList').on('dragstart', self.carDragging);
        $('#favoriteCars').on('dragenter', self.preventDefault);
        $('#favoriteCars').on('dragover', self.preventDefault);
        $('#favoriteCars').on('drop', self.dropCar);

        /*
         * file drag and drop (also requires dataTrasnsferObject)
         */
        $('#target').on('dragenter', self.preventDefault);
        $('#target').on('dragover', self.preventDefault);
        $('#target').on('drop', self.dropfile);
        /*
         * scramble game example
         *
         */
        self.createBoard();
        self.addTiles();
        $('#gameBoard').on('dragstart', self.dragStarted);
        $('#gameBoard').on('dragend', self.dragEnded);
        $('#gameBoard').on('dragenter', self.preventDefault);
        $('#gameBoard').on('dragover', self.preventDefault);
        $('#gameBoard').on('drop', self.tileDrop);
        self.scramble();
    };
    /*
     * common
     */

    this.preventDefault = function (e) {
        e.preventDefault();
    };
    /*
     * w/o data transfer object
     */

    this.dragging = function (e) {
        $(e.target).addClass('dragging');
        $draggedItem = $(e.target);
    };
    this.draggingEnded = function (e) {
        $(e.target).removeClass('dragging');
    };

    this.dropItem = function (e) {
        var hole = $(e.target);
        if (hole.hasClass('hole') && hole.children().length == 0) {
            $draggedItem.detach();
            $draggedItem.appendTo($(e.target));
        }
    };

    /*
     * data transfer object
     */
    this.carDragging = function (e) {
        var val = e.target.getAttribute('data-value');
        e.dataTransfer.setData('text', val);
        e.dataTransfer.effectAllowed = 'copy';
    };
    this.dropCar = function (e) {
        var data = e.dataTransfer.getData('text').split(',');
        if (data[0] == 'car') {
            var li = document.createElement('li');
            li.textContent = data[1];
            li.setAttribute("class", "whiteText");
            e.target.appendChild(li);
        }
    };
    /*
     * file drag and drop
     */
    this.dropfile = function (e) {
        var files = e.dataTransfer.files;
        var $table = $('#fileInfo'), i = 0;

        $table.html(
        '<thead><tr><th>Name</th><th>Type</th><th>Size</th></tr></thead>');
        for (i = 0; i < files.length; i++) {
            $('<tr><td>'
            + files[i].name + '</td><td>'
            + files[i].type + '</td><td>'
            + files[i].size + '</td></tr>').appendTo($table);
        }
        self.preventDefault(e);
    };
    /*
     * Scramble game
     */
    this.createBoard = function () {
        for (var i = 0; i < self.squareCount; i++) {
            var $square = $('<div id="square' + i + '" data-square="'
            + i + '" class="square"></div>');
            $square.appendTo($('#gameBoard'));
        }
    };

    this.addTiles = function () {
        self.emptySquare = self.squareCount - 1;
        for (var i = 0; i < self.emptySquare; i++) {
            var $square = $('#square' + i);
            var $tile = $('<div draggable="true" id="tile' + i
            + '" class="tile">' + (i + 1) + '</div>');
            $tile.appendTo($square);
        }
    };

    this.dragStarted = function (e) {
        var $tile = $(e.target)
        $tile.addClass('dragged');
        var sourceLocation = $tile.parent().data('square');
        e.dataTransfer.setData('text', sourceLocation.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    this.dragEnded = function (e) {
        $(e.target).removeClass('dragged');
    };

    this.tileDrop = function (e) {
        var $square = $(e.target);
        if ($square.hasClass('square')) {
            var destinationLocation = $square.data('square');
            if (self.emptySquare != destinationLocation) return;
            var sourceLocation = Number(e.dataTransfer.getData('text'));
            self.moveTile(sourceLocation);
            self.checkForWinner();
        }
    };
    this.moveTile = function (sourceLocation) {
        var distance = sourceLocation - self.emptySquare;
        if (distance < 0) distance = -(distance);
        if (distance == 1 || distance == 4) {
            self.swapTileAndEmptySquare(sourceLocation);
        }
    }

    this.swapTileAndEmptySquare = function (sourceLocation) {
        var $draggedItem = $('#square' + sourceLocation).children();
        $draggedItem.detach();
        var $target = $('#square' + self.emptySquare);
        $draggedItem.appendTo($target);
        self.emptySquare = sourceLocation;
    }
    this.scramble= function(){
        for (var i = 0; i < 128; i++) {
            var random = Math.random()
            var sourceLocation;
            var emptySquare = self.emptySquare;
            if (random < 0.5) {
                var column = emptySquare % 4
                if (column == 0 || (random < 0.25 && column != 3)) {
                    sourceLocation = emptySquare + 1;
                }
                else {
                    sourceLocation = emptySquare - 1;
                }
            }
            else {
                var row = Math.floor(emptySquare / 4)
                if (row == 0 || (random < 0.75 && row != 3)) {
                    sourceLocation = emptySquare + 4;
                }
                else {
                    sourceLocation = emptySquare - 4;
                }
            }
            self.swapTileAndEmptySquare(sourceLocation);
        }
    };

    this.checkForWinner = function () {
        if (self.emptySquare != self.squareCount - 1) return;
        for (var i = 0; i < self.emptySquare; i++) {
            if ($('#tile' + i).parent().attr('id') != 'square' + i) return;
        }
        $('#message').html('Winner!');
    }

    self.init();
    return self;
};
