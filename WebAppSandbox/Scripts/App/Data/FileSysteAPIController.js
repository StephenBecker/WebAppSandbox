/// <reference path="../../_references.js" />
this.App = this.App || {};
var app = this.App;
app.Data = app.Data || {};

/*
 * Vendor Specific
 */
window.requestFileSystem = window.requestFileSystem ||
window.webkitRequestFileSystem;

app.Data.FileSystemAPIController = function () {
    var self = this;

    this.createTempFile = function () {
        window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);
        function getFile(fileSystem) {
            fileSystem.root.getFile("example.txt", { create: true }, fileOpened, handleError);
        };
        function fileOpened(fileEntry) {
            alert("File opened!");
        };
        function handleError(error) {
            alert(error.code);
        };
    }

    this.init = function () {
    }

    self.init();
    return self;
};
