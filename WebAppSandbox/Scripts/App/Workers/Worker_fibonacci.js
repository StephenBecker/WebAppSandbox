self.onmessage = function (e) {
    var timestart = new Date().getTime();
    var n = parseInt(e.data);
    var result = self.generateFiboSeries(n);
    var executionTime = (new Date().getTime() - timestart)/1000

    postMessage("time = "+executionTime+" sec "+ result);
}

self.generateFiboSeries = function (seriesLength) {
    var results = [];
    results.length = 0;
    for (var i = 0; i <= seriesLength - 1; i++) {
        results.push(self.calcuateNextValue(i));
        postMessage((seriesLength-i)+" remaining")
    }
    return results;
}

self.calcuateNextValue = function (n) {
    var s = 0;
    var returnValue;
    if (n == 0) { return s; };
    if (n == 1) { s += 1; return s; } else
    {
        return (self.calcuateNextValue(n - 1) + self.calcuateNextValue(n - 2));
    };
}
