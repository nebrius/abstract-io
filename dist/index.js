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
class AbstractIOCore extends events_1.EventEmitter {
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
        this.HIGH = Value.HIGH;
        this.LOW = Value.LOW;
    }
    // Deprecated aliases and firmata.js compatibility functions that IO plugins don't need to worry about
    analogWrite(pin, value) {
        this.pwmWrite(pin, value);
    }
    sendI2CConfig(options) {
        return this.i2cConfig(options);
    }
    sendI2CWriteRequest(address, registerOrInBytes, inBytes) {
        return this.i2cWrite(address, registerOrInBytes, inBytes);
    }
    sendI2CReadRequest(address, registerOrBytesToRead, bytesToReadOrHandler, handler) {
        return this.i2cReadOnce(address, registerOrBytesToRead, bytesToReadOrHandler, handler);
    }
    reset() {
        throw new Error('reset is not supported by this IO plugin');
    }
    reportAnalogPin() {
        throw new Error('reportAnalogPin is not supported by this IO plugin');
    }
    reportDigitalPin() {
        throw new Error('reportDigitalPin is not supported by this IO plugin');
    }
    pulseIn() {
        throw new Error('pulseIn is not supported by this IO plugin');
    }
}
exports.AbstractIOCore = AbstractIOCore;
class AbstractIO extends AbstractIOCore {
    constructor() {
        super(...arguments);
        this.name = 'Unnamed IO Plugin';
        this.defaultLed = NaN;
    }
    pinMode(pin, mode) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // Writing methods
    analogWrite(pin, value) {
        this.pwmWrite(pin, value);
    }
    pwmWrite(pin, value) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    servoWrite(pin, value) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    digitalWrite(pin, value) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    i2cWrite(address, registerOrInBytes, inBytes) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    i2cWriteReg(address, register, value) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    serialWrite(portId, inBytes) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // Reading methods
    analogRead(pin, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    digitalRead(pin, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    i2cRead(address, registerOrBytesToRead, bytesToReadOrHandler, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    i2cReadOnce(address, registerOrBytesToRead, bytesToReadOrHandler, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    pingRead(settings, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    serialRead(portId, maxBytesToReadOrHandler, handler) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // Configuring
    i2cConfig(options) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    serialConfig(options) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    servoConfig(optionsOrPin, min, max) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // IO Control
    serialStop(portId) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    serialClose(portId) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    serialFlush(portId) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // One Wire (not currently documented, see https://github.com/rwaldron/io-plugins/issues/22)
    sendOneWireConfig() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireSearch() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireAlarmsSearch() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireRead() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireReset() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireWrite() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireDelay() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    sendOneWireWriteAndRead() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    setSamplingInterval() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    stepperConfig() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    stepperStep() {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
    // Special
    normalize(pin) {
        throw new Error('This method must be implemented by a derived IO Plugin class');
    }
}
exports.AbstractIO = AbstractIO;
//# sourceMappingURL=index.js.map