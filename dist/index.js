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
    Mode[Mode["UNKOWN"] = 99] = "UNKOWN";
})(Mode = exports.Mode || (exports.Mode = {}));
var Value;
(function (Value) {
    Value[Value["HIGH"] = 1] = "HIGH";
    Value[Value["LOW"] = 0] = "LOW";
})(Value = exports.Value || (exports.Value = {}));
class AbstractIO extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.MODES = {
            INPUT: Mode.INPUT,
            OUTPUT: Mode.OUTPUT,
            ANALOG: Mode.ANALOG,
            PWM: Mode.PWM,
            SERVO: Mode.SERVO
        };
        this.HIGH = Value.HIGH;
        this.LOW = Value.LOW;
        this.pins = [];
        this.analogPins = [];
        this.name = 'Unnamed IO Plugin';
        this.defaultLed = NaN;
        this.isReady = false;
    }
    pinMode(pin, mode) {
        throw new Error(`pinMode is not supported by ${this.name}`);
    }
    // Writing methods
    pwmWrite(pin, value) {
        throw new Error(`pwmWrite is not supported by ${this.name}`);
    }
    servoWrite(pin, value) {
        throw new Error(`servoWrite is not supported by ${this.name}`);
    }
    digitalWrite(pin, value) {
        throw new Error(`digitalWrite is not supported by ${this.name}`);
    }
    i2cWrite(address, registerOrInBytes, inBytes) {
        throw new Error(`i2cWrite is not supported by ${this.name}`);
    }
    i2cWriteReg(address, register, value) {
        throw new Error(`i2cWriteReg is not supported by ${this.name}`);
    }
    serialWrite(portId, inBytes) {
        throw new Error(`serialWrite is not supported by ${this.name}`);
    }
    // Reading methods
    analogRead(pin, handler) {
        throw new Error(`analogRead is not supported by ${this.name}`);
    }
    digitalRead(pin, handler) {
        throw new Error(`digitalRead is not supported by ${this.name}`);
    }
    i2cRead(address, registerOrBytesToRead, bytesToReadOrHandler, handler) {
        throw new Error(`i2cRead is not supported by ${this.name}`);
    }
    i2cReadOnce(address, registerOrBytesToRead, bytesToReadOrHandler, handler) {
        throw new Error(`i2cReadOnce is not supported by ${this.name}`);
    }
    pingRead(settings, handler) {
        throw new Error(`pingRead is not supported by ${this.name}`);
    }
    serialRead(portId, maxBytesToReadOrHandler, handler) {
        throw new Error(`serialRead is not supported by ${this.name}`);
    }
    // Configuring
    i2cConfig(options) {
        throw new Error(`i2cConfig is not supported by ${this.name}`);
    }
    serialConfig(options) {
        throw new Error(`serialConfig is not supported by ${this.name}`);
    }
    servoConfig(optionsOrPin, min, max) {
        throw new Error(`servoConfig is not supported by ${this.name}`);
    }
    // IO Control
    serialStop(portId) {
        throw new Error(`serialStop is not supported by ${this.name}`);
    }
    serialClose(portId) {
        throw new Error(`serialClose is not supported by ${this.name}`);
    }
    serialFlush(portId) {
        throw new Error(`serialFlush is not supported by ${this.name}`);
    }
    // One Wire (not currently documented, see https://github.com/rwaldron/io-plugins/issues/22)
    sendOneWireConfig() {
        throw new Error(`sendOneWireConfig is not supported by ${this.name}`);
    }
    sendOneWireSearch() {
        throw new Error(`sendOneWireSearch is not supported by ${this.name}`);
    }
    sendOneWireAlarmsSearch() {
        throw new Error(`sendOneWireAlarmsSearch is not supported by ${this.name}`);
    }
    sendOneWireRead() {
        throw new Error(`sendOneWireRead is not supported by ${this.name}`);
    }
    sendOneWireReset() {
        throw new Error(`sendOneWireReset is not supported by ${this.name}`);
    }
    sendOneWireWrite() {
        throw new Error(`sendOneWireWrite is not supported by ${this.name}`);
    }
    sendOneWireDelay() {
        throw new Error(`sendOneWireDelay is not supported by ${this.name}`);
    }
    sendOneWireWriteAndRead() {
        throw new Error(`sendOneWireWriteAndRead is not supported by ${this.name}`);
    }
    setSamplingInterval() {
        throw new Error(`setSamplingInterval is not supported by ${this.name}`);
    }
    stepperConfig() {
        throw new Error(`stepperConfig is not supported by ${this.name}`);
    }
    stepperStep() {
        throw new Error(`stepperStep is not supported by ${this.name}`);
    }
    // Special
    normalize(pin) {
        throw new Error(`normalize is not supported by ${this.name}`);
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
exports.AbstractIO = AbstractIO;
//# sourceMappingURL=index.js.map