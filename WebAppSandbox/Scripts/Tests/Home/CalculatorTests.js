module('Calculator Test Suite', { setup: function () { _sut = App.Home.CalculatorController() } })

test("Btn5 Click Test", function () {
    expect(1);
    var btn = document.getElementById('btn5');
    QUnit.triggerEvent(btn, "click");
    var result = txtInput.value;
    var expected = '5';
    equal(result, expected, 'Expected value: ' + expected + ' Actual value: ' +
    result);
});

test("Button Click Test", function () {
    var buttonQuantity = 10;
    expect(buttonQuantity * 2);
    for (var i = 0; i < buttonQuantity; i++) {
        var btn = document.getElementById('btn' + i);
        QUnit.triggerEvent(btn, "click");
        var result = txtInput.value[txtInput.value.length - 1];
        var expected = String(i);
        equal(result, expected, 'Expected value: ' + expected +
        ' Actual value: ' + result);
        var expectedLength = i < 2 ? 1 : i;
        equal(txtInput.value.length, expectedLength,
        'Expected string length: ' + expectedLength +
        ' Actual value: ' + txtInput.value.length);
    }
});

test("Add Test", function () {
    expect(1);
    txtInput.value = '10';
    txtResult.value = '20';
    var btnPlus = document.getElementById('btnPlus');
    QUnit.triggerEvent(btnPlus, "click");
    var expected = '30';
    equal(txtResult.value, expected, 'Expected value: ' + expected +
    ' Actual value: ' + txtResult.value);
});
test("Subtract Test", function () {
    expect(1);
    txtInput.value = '10';
    txtResult.value = '20';
    var btnMinus = document.getElementById('btnMinus');
    QUnit.triggerEvent(btnMinus, "click");
    var expected = '10';
    equal(txtResult.value, expected, 'Expected value: ' + expected +
    ' Actual value: ' + txtResult.value);
});
test("Clear entry test", function () {
    expect(2);
    txtInput.value = '10';
    txtResult.value = '20';
    var ceBtn = document.getElementById('btnClearEntry');
    QUnit.triggerEvent(ceBtn, "click");
    var expectedresult = '20';
    var expectedInput = '';
    equal(txtResult.value, expectedresult, 'Result Expected value: ' + expectedresult +
    ' Actual value: ' + txtResult.value);
    equal(txtInput.value, expectedInput, 'Result Expected value: ' + expectedInput +
' Actual value: ' + txtResult.value);
});
test("Clear all test", function () {
    expect(2);
    txtInput.value = '10';
    txtResult.value = '20';
    var cBtn = document.getElementById('btnClear');
    QUnit.triggerEvent(cBtn, "click");
    var expectedresult = '';
    var expectedInput = '';
    equal(txtResult.value, expectedresult, 'Result Expected value: ' + expectedresult +
    ' Actual value: ' + txtResult.value);
    equal(txtInput.value, expectedInput, 'Result Expected value: ' + expectedInput +
' Actual value: ' + txtResult.value);
});
