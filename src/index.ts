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

import { EventEmitter } from 'events';

export enum Mode {
  INPUT = 0,
  OUTPUT = 1,
  ANALOG = 2,
  PWM = 3,
  SERVO = 4
}

export enum Value {
  HIGH = 1,
  LOW = 0
}

export interface IPinConfiguration {
  supportedModes: Mode[];
  mode: Mode;
  value: Value;
  reporting: 0 | 1;
  analogChannel: number;
}

export interface IPingReadSettings {
  pin: number | string;
  value?: Value;
  pulseOut?: number;
}

export interface II2CConfig {
  address: number;
  bus?: number | string;
  port?: number;
  delay?: number;
}

export interface ISerialConfig {
  portId: number | string;
  baud?: number;
  rxPin?: number | string;
  txPin?: number | string;
}

export interface IServoConfig {
  pin: number | string;
  min?: number;
  max?: number;
}

export type ReadHandler = (data: number[]) => void;

export abstract class AbstractIOCore extends EventEmitter {
  public isReady = false;

  public readonly MODES = {
    INPUT: Mode.INPUT,
    OUTPUT: Mode.OUTPUT,
    ANALOG: Mode.ANALOG,
    PWM: Mode.PWM,
    SERVO: Mode.SERVO
  };

  public readonly pins: IPinConfiguration[] = [];
  public readonly analogPins: number[] = [];
  public readonly HIGH: number = Value.HIGH;
  public readonly LOW: number = Value.LOW;
  public abstract readonly name: string;
  public abstract readonly defaultLed: string | number;

  public abstract pinMode(pin: string | number, mode: Mode): void;

  // Writing methods

  public abstract pwmWrite(pin: string | number, value: number): void;

  public abstract servoWrite(pin: string | number, value: number): void;

  public abstract digitalWrite(pin: string | number, value: number): void;

  public abstract i2cWrite(address: number, inBytes: number[]): void;
  public abstract i2cWrite(address: number, register: number, inBytes: number[]): void;
  public abstract i2cWrite(address: number, registerOrInBytes: number | number[], inBytes?: number[]): void;

  public abstract i2cWriteReg(address: number, register: number, value: number): void;

  public abstract serialWrite(portId: string | number, inBytes: number[]): void;

  // Reading methods

  public abstract analogRead(pin: string | number, handler: (value: number) => void): void;

  public abstract digitalRead(pin: string | number, handler: (value: Value) => void): void;

  public abstract i2cRead(
    address: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public abstract i2cRead(
    address: number,
    register: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public abstract i2cRead(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void;

  public abstract i2cReadOnce(
    address: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public abstract i2cReadOnce(
    address: number,
    register: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public abstract i2cReadOnce(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void;

  public abstract pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void;

  public abstract serialRead(
    portId: number | string,
    handler: ReadHandler
  ): void;
  public abstract serialRead(
    portId: number | string,
    maxBytesToRead: number,
    handler: ReadHandler
  ): void;
  public abstract serialRead(
    portId: number | string,
    maxBytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void;

  // Configuring

  public abstract i2cConfig(options: II2CConfig): void;

  public abstract serialConfig(options: ISerialConfig): void;

  public abstract servoConfig(options: IServoConfig): void;
  public abstract servoConfig(pin: number, min: number, max: number): void;
  public abstract servoConfig(optionsOrPin: IServoConfig | number, min?: number, max?: number): void;

  // IO Control

  public abstract serialStop(portId: number | string): void;

  public abstract serialClose(portId: number | string): void;

  public abstract serialFlush(portId: number | string): void;

  // Methods not currently documented and with incorrect signatures
  // See https://github.com/rwaldron/io-plugins/issues/22)

  public abstract sendOneWireConfig(): void;

  public abstract sendOneWireSearch(): void;

  public abstract sendOneWireAlarmsSearch(): void;

  public abstract sendOneWireRead(): void;

  public abstract sendOneWireReset(): void;

  public abstract sendOneWireWrite(): void;

  public abstract sendOneWireDelay(): void;

  public abstract sendOneWireWriteAndRead(): void;

  public abstract setSamplingInterval(): void;

  public abstract stepperConfig(): void;

  public abstract stepperStep(): void;

  // Special

  public abstract normalize(pin: number | string): number;

  // Deprecated aliases and firmata.js compatibility functions that IO plugins don't need to worry about

  public analogWrite(pin: string | number, value: number): void {
    this.pwmWrite(pin, value);
  }

  public sendI2CConfig(options: II2CConfig) {
    return this.i2cConfig(options);
  }

  public sendI2CWriteRequest(address: number, inBytes: number[]): void;
  public sendI2CWriteRequest(address: number, register: number, inBytes: number[]): void;
  public sendI2CWriteRequest(address: number, registerOrInBytes: number | number[], inBytes?: number[]): void {
    return this.i2cWrite(address, registerOrInBytes, inBytes);
  }

  public sendI2CReadRequest(
    address: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public sendI2CReadRequest(
    address: number,
    register: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public sendI2CReadRequest(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void {
    return this.i2cReadOnce(address, registerOrBytesToRead, bytesToReadOrHandler, handler);
  }

  public reset() {
    throw new Error('reset is not supported by this IO plugin');
  }

  public reportAnalogPin() {
    throw new Error('reportAnalogPin is not supported by this IO plugin');
  }

  public reportDigitalPin() {
    throw new Error('reportDigitalPin is not supported by this IO plugin');
  }

  public pulseIn() {
    throw new Error('pulseIn is not supported by this IO plugin');
  }
}

export class AbstractIO extends AbstractIOCore {
  public readonly name: string = 'Unnamed IO Plugin';
  public readonly defaultLed: string | number = NaN;

  public pinMode(pin: string | number, mode: Mode): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // Writing methods

  public analogWrite(pin: string | number, value: number): void {
    this.pwmWrite(pin, value);
  }

  public pwmWrite(pin: string | number, value: number): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public servoWrite(pin: string | number, value: number): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public digitalWrite(pin: string | number, value: number): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public i2cWrite(address: number, inBytes: number[]): void;
  public i2cWrite(address: number, register: number, inBytes: number[]): void;
  public i2cWrite(address: number, registerOrInBytes: number | number[], inBytes?: number[]): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public i2cWriteReg(address: number, register: number, value: number): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public serialWrite(portId: string | number, inBytes: number[]): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // Reading methods

  public analogRead(pin: string | number, handler: (value: number) => void): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public digitalRead(pin: string | number, handler: (value: Value) => void): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public i2cRead(
    address: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public i2cRead(
    address: number,
    register: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public i2cRead(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public i2cReadOnce(
    address: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public i2cReadOnce(
    address: number,
    register: number,
    bytesToRead: number,
    handler: ReadHandler
  ): void;
  public i2cReadOnce(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public serialRead(
    portId: number | string,
    handler: ReadHandler
  ): void;
  public serialRead(
    portId: number | string,
    maxBytesToRead: number,
    handler: ReadHandler
  ): void;
  public serialRead(
    portId: number | string,
    maxBytesToReadOrHandler: ReadHandler | number,
    handler?: ReadHandler
  ): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // Configuring

  public i2cConfig(options: II2CConfig): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public serialConfig(options: ISerialConfig): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public servoConfig(options: IServoConfig): void;
  public servoConfig(pin: number, min: number, max: number): void;
  public servoConfig(optionsOrPin: IServoConfig | number, min?: number, max?: number): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // IO Control

  public serialStop(portId: number | string): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public serialClose(portId: number | string): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public serialFlush(portId: number | string): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // One Wire (not currently documented, see https://github.com/rwaldron/io-plugins/issues/22)

  public sendOneWireConfig(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireSearch(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireAlarmsSearch(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireRead(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireReset(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireWrite(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireDelay(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public sendOneWireWriteAndRead(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public setSamplingInterval(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public stepperConfig(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  public stepperStep(): void {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }

  // Special

  public normalize(pin: number | string): number {
    throw new Error('This method must be implemented by a derived IO Plugin class');
  }
}
