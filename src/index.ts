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
  SERVO = 4,
  UNKOWN = 99
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

export class AbstractIO extends EventEmitter {
  public get MODES() {
    return {
      INPUT: Mode.INPUT,
      OUTPUT: Mode.OUTPUT,
      ANALOG: Mode.ANALOG,
      PWM: Mode.PWM,
      SERVO: Mode.SERVO,
      UNKOWN: Mode.UNKOWN
    };
  }

  public get HIGH() {
    return Value.HIGH;
  }
  public get LOW() {
    return Value.LOW;
  }

  public get pins(): IPinConfiguration[] {
    throw new Error(`The "pins" property must be overridden by a derived IO Plugin class`);
  }

  public get analogPins(): number[] {
    throw new Error(`The "analogPins" property must be overridden by a derived IO Plugin class`);
  }

  public get name(): string {
    throw new Error(`The "name" property must be overridden by a derived IO Plugin class`);
  }

  public get defaultLed(): string | number | undefined {
    return undefined;
  }

  public get isReady(): boolean {
    throw new Error(`The "isReady" property must be overridden by a derived IO Plugin class`);
  }

  public pinMode(pin: string | number, mode: Mode): void {
    throw new Error(`The "pinMode" method must be overridden by a derived IO Plugin class`);
  }

  // Writing methods

  public pwmWrite(pin: string | number, value: number): void {
    throw new Error(`pwmWrite is not supported by ${this.name}`);
  }

  public servoWrite(pin: string | number, value: number): void {
    throw new Error(`servoWrite is not supported by ${this.name}`);
  }

  public digitalWrite(pin: string | number, value: number): void {
    throw new Error(`digitalWrite is not supported by ${this.name}`);
  }

  public i2cWrite(address: number, inBytes: number[]): void;
  public i2cWrite(address: number, register: number, inBytes: number[]): void;
  public i2cWrite(address: number, registerOrInBytes: number | number[], inBytes?: number[]): void {
    throw new Error(`i2cWrite is not supported by ${this.name}`);
  }

  public i2cWriteReg(address: number, register: number, value: number): void {
    throw new Error(`i2cWriteReg is not supported by ${this.name}`);
  }

  public serialWrite(portId: string | number, inBytes: number[]): void {
    throw new Error(`serialWrite is not supported by ${this.name}`);
  }

  // Reading methods

  public analogRead(pin: string | number, handler: (value: number) => void): void {
    throw new Error(`analogRead is not supported by ${this.name}`);
  }

  public digitalRead(pin: string | number, handler: (value: Value) => void): void {
    throw new Error(`digitalRead is not supported by ${this.name}`);
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
    throw new Error(`i2cRead is not supported by ${this.name}`);
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
    throw new Error(`i2cReadOnce is not supported by ${this.name}`);
  }

  public pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void {
    throw new Error(`pingRead is not supported by ${this.name}`);
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
    throw new Error(`serialRead is not supported by ${this.name}`);
  }

  // Configuring

  public i2cConfig(options: II2CConfig): void {
    throw new Error(`i2cConfig is not supported by ${this.name}`);
  }

  public serialConfig(options: ISerialConfig): void {
    throw new Error(`serialConfig is not supported by ${this.name}`);
  }

  public servoConfig(options: IServoConfig): void;
  public servoConfig(pin: number, min: number, max: number): void;
  public servoConfig(optionsOrPin: IServoConfig | number, min?: number, max?: number): void {
    throw new Error(`servoConfig is not supported by ${this.name}`);
  }

  // IO Control

  public serialStop(portId: number | string): void {
    throw new Error(`serialStop is not supported by ${this.name}`);
  }

  public serialClose(portId: number | string): void {
    throw new Error(`serialClose is not supported by ${this.name}`);
  }

  public serialFlush(portId: number | string): void {
    throw new Error(`serialFlush is not supported by ${this.name}`);
  }

  // One Wire (not currently documented, see https://github.com/rwaldron/io-plugins/issues/22)

  public sendOneWireConfig(): void {
    throw new Error(`sendOneWireConfig is not supported by ${this.name}`);
  }

  public sendOneWireSearch(): void {
    throw new Error(`sendOneWireSearch is not supported by ${this.name}`);
  }

  public sendOneWireAlarmsSearch(): void {
    throw new Error(`sendOneWireAlarmsSearch is not supported by ${this.name}`);
  }

  public sendOneWireRead(): void {
    throw new Error(`sendOneWireRead is not supported by ${this.name}`);
  }

  public sendOneWireReset(): void {
    throw new Error(`sendOneWireReset is not supported by ${this.name}`);
  }

  public sendOneWireWrite(): void {
    throw new Error(`sendOneWireWrite is not supported by ${this.name}`);
  }

  public sendOneWireDelay(): void {
    throw new Error(`sendOneWireDelay is not supported by ${this.name}`);
  }

  public sendOneWireWriteAndRead(): void {
    throw new Error(`sendOneWireWriteAndRead is not supported by ${this.name}`);
  }

  public setSamplingInterval(): void {
    throw new Error(`setSamplingInterval is not supported by ${this.name}`);
  }

  public stepperConfig(): void {
    throw new Error(`stepperConfig is not supported by ${this.name}`);
  }

  public stepperStep(): void {
    throw new Error(`stepperStep is not supported by ${this.name}`);
  }

  // Special

  public normalize(pin: number | string): number {
    throw new Error(`normalize is not supported by ${this.name}`);
  }

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
    return this.i2cWrite(address, registerOrInBytes as any, inBytes as any);
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
    return this.i2cReadOnce(address, registerOrBytesToRead, bytesToReadOrHandler as any, handler as any);
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
