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

export abstract class AbstractIO extends EventEmitter {
  public isReady = false;

  public readonly MODES = {
    INPUT: Mode.INPUT,
    OUTPUT: Mode.OUTPUT,
    ANALOG: Mode.ANALOG,
    PWM: Mode.PWM,
    SERVO: Mode.SERVO
  };

  public abstract readonly pins: IPinConfiguration[] = [];
  public abstract readonly analogPins: number[] = [];
  public abstract readonly name: string;
  public abstract readonly defaultLed: string | number;

  public abstract pinMode(pin: string | number, mode: Mode): void;

  // Writing methods

  public analogWrite(pin: string | number, value: number): void {
    this.pwmWrite(pin, value);
  }

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
    handler: (data: number[]) => void
  ): void;
  public abstract i2cRead(
    address: number,
    register: number,
    bytesToRead: number,
    handler: (data: number[]) => void
  ): void;
  public abstract i2cRead(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: (data: number[]) => void | number,
    handler?: (data: number[]) => void
  ): void;

  public abstract i2cReadOnce(
    address: number,
    bytesToRead: number,
    handler: (data: number[]) => void
  ): void;
  public abstract i2cReadOnce(
    address: number,
    register: number,
    bytesToRead: number,
    handler: (data: number[]) => void
  ): void;
  public abstract i2cReadOnce(
    address: number,
    registerOrBytesToRead: number,
    bytesToReadOrHandler: (data: number[]) => void | number,
    handler?: (data: number[]) => void
  ): void;

  public abstract pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void;

  public abstract serialRead(
    portId: number | string,
    handler: (data: number[]) => void
  ): void;
  public abstract serialRead(
    portId: number | string,
    maxBytesToRead: number,
    handler: (data: number[]) => void
  ): void;
  public abstract serialRead(
    portId: number | string,
    maxBytesToReadOrHandler: (data: number[]) => void | number,
    handler?: (data: number[]) => void
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

  // Special

  public abstract normalize(pin: number | string): number;
}
