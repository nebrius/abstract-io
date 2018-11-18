"use strict";
/*
MIT License

Copyright (c) 2018 Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
var Mode;
(function (Mode) {
    Mode[Mode["INPUT"] = 0] = "INPUT";
    Mode[Mode["OUTPUT"] = 1] = "OUTPUT";
    Mode[Mode["ANALOG"] = 2] = "ANALOG";
    Mode[Mode["PWM"] = 3] = "PWM";
    Mode[Mode["SERVO"] = 4] = "SERVO";
})(Mode = exports.Mode || (exports.Mode = {}));
var Value;
(function (Value) {
    Value[Value["HIGH"] = 1] = "HIGH";
    Value[Value["LOW"] = 0] = "LOW";
})(Value = exports.Value || (exports.Value = {}));
class AbstractIO extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.isReady = false;
        this.MODES = {
            INPUT: Mode.INPUT,
            OUTPUT: Mode.OUTPUT,
            ANALOG: Mode.ANALOG,
            PWM: Mode.PWM,
            SERVO: Mode.SERVO
        };
        this.pins = [];
        this.analogPins = [];
    }
    // Writing methods
    analogWrite(pin, value) {
        this.pwmWrite(pin, value);
    }
}
exports.AbstractIO = AbstractIO;
//# sourceMappingURL=index.js.map