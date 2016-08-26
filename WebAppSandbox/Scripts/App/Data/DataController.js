/// <reference path="../../_references.js" />
this.App = this.App || {};
var app = this.App;
app.Data = app.Data || {};
/*
 * browser specific code for IndexedDB
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

app.Data.DataController = function (cookieService) {
    var self = this;
    this.cookieSer = cookieService;
    this.hasLocalStorage;
    this.db;
    this.indexedDb;
    this.iOpenRequest;
    this.idb;

    this.init = function () {
        self.createDB();

        $("#localStorageAvailable").text(self.checkLocalStorage)
        $("#btn-storeLocal").on('click', self.saveLocal);

        $("#btn-setCookie").on('click', function () {
            self.setCookie();
        });

        $("#btn-getCookie").on('click', function () {
            self.getCookie();
        });
        $("#btn-cookieCutter").on('click', function () {
            self.cookieSer.destroyAllCookies();
        });
        $("#btn-storeEvent").on('click', function () {
            self.setStorageEventListener($("#storageEventName").val());
        });

        $("#btn-sqlExecute").on('click', self.executeSql);

        $("#allCookies").html(self.cookieSer.getAllCookies());
    };
    this.setCookie = function () {
        var name = $("#cookieName").val() || "noName";
        var val = $("#cookieValue").val() || "noVal";
        var expires = $("#cookieexpirationDays").val() || 0;
        self.cookieSer.setCookie(name, val, expires);
    };

    this.getCookie = function () {
        var target = $("#cookieVal");
        var name = $("#searchName").val() || "noName";
        var value = self.cookieSer.getCookie(name);
        target.html(name + " : " + value);
    };

    this.checkLocalStorage = function () {
        self.hasLocalStorage = 'localStorage' in window;
        return self.hasLocalStorage;
    }

    this.saveLocal = function () {
        if (self.hasLocalStorage) {
            var name = $("#storageName").val();
            var value = $("#storageValue").val();
            localStorage.setItem(name, value);
        } else {
            alert("local storage unavailible")
        }
    }
    this.setStorageEventListener = function (name) {
        window.addEventListener('storage', self.storageResponse, false);
    }

    this.storageResponse = function (e) {
        var key = e.key;
        var oldvalue = e.oldValue;
        var newValue = e.newValue;
        var url = e.url;
        var storageArea = e.storageArea;
        console.log(e);
        $("#storageEvents").html($("#storageEvents").html() +
            "<li> Key: " + key + " old: " + oldvalue + " new: " + newValue + " url: " + url + " area:" + storageArea + "</li>"
            )
    }

    this.createDB = function () {
        if (Modernizr.websqldatabase) {
            var db = self.initilizeDatabase();
            db.transaction(function (t) {
                t.executeSql("CREATE TABLE IF NOT EXISTS authors(" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "firstName TEXT, " +
                    "lastName TEXT, " +
                    "dateCreated TIMESTAMP DEFAULT(datetime('now', 'localtime')) " +
                    "INSERT INTO authors(firstName, lastName) "
                    + " VALUES('Daniel', 'Defoe'))");
            });
        } else {
            $("#webSQLExample").html("web sql is not supported in this browser");
        }
    }

    this.initilizeDatabase = function () {
        return openDatabase('Library', '2.0', 'My library', 5 * 1024 * 1024);
    };

    this.executeSql = function (transaction) {
        var query = $("#sqlExecuteInput").val();
        var db = self.initilizeDatabase();
        db.transaction(function (t) {
            t.executeSql(query, [], displayResults);
        });
    };

    function displayResults(transaction, results) {
        var result = '';
        for (var i = 0; i < results.rows.length; i++) {
            result = result + JSON.stringify(results.rows.item(i));
        }
        $("#sqlResult").val(result);
    }

    this.initIndexedDb = function () {
        self.indexedDb = window.indexedDB;
        self.iOpenRequest = self.indexedDb.open('Library', 1);

        self.initIndexedDb.onsuccess = function (response) {
            self.idb = self.openRequest.result;
        };
        self.initIndexedDb.onerror = function (response) {
            alert("Error code: " + response.target.errorCode);
        };
        openRequest.onupgradeneeded = function (response) {
            response.currentTarget.result.createObjectStore("authors",
            { keypath: 'id', autoIncrement: true });
        };
    };

    self.init();
    return self;
};
