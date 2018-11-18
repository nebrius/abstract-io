/// <reference types="node" />
import { EventEmitter } from 'events';
export declare enum Mode {
    INPUT = 0,
    OUTPUT = 1,
    ANALOG = 2,
    PWM = 3,
    SERVO = 4
}
export declare enum Value {
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
export declare abstract class AbstractIO extends EventEmitter {
    isReady: boolean;
    readonly MODES: {
        INPUT: Mode;
        OUTPUT: Mode;
        ANALOG: Mode;
        PWM: Mode;
        SERVO: Mode;
    };
    abstract readonly pins: IPinConfiguration[];
    abstract readonly analogPins: number[];
    abstract readonly name: string;
    abstract readonly defaultLed: string | number;
    abstract pinMode(pin: string | number, mode: Mode): void;
    analogWrite(pin: string | number, value: number): void;
    abstract pwmWrite(pin: string | number, value: number): void;
    abstract servoWrite(pin: string | number, value: number): void;
    abstract digitalWrite(pin: string | number, value: number): void;
    abstract i2cWrite(address: number, inBytes: number[]): void;
    abstract i2cWrite(address: number, register: number, inBytes: number[]): void;
    abstract i2cWrite(address: number, registerOrInBytes: number | number[], inBytes?: number[]): void;
    abstract i2cWriteReg(address: number, register: number, value: number): void;
    abstract serialWrite(portId: string | number, inBytes: number[]): void;
    abstract analogRead(pin: string | number, handler: (value: number) => void): void;
    abstract digitalRead(pin: string | number, handler: (value: Value) => void): void;
    abstract i2cRead(address: number, bytesToRead: number, handler: (data: number[]) => void): void;
    abstract i2cRead(address: number, register: number, bytesToRead: number, handler: (data: number[]) => void): void;
    abstract i2cRead(address: number, registerOrBytesToRead: number, bytesToReadOrHandler: (data: number[]) => void | number, handler?: (data: number[]) => void): void;
    abstract i2cReadOnce(address: number, bytesToRead: number, handler: (data: number[]) => void): void;
    abstract i2cReadOnce(address: number, register: number, bytesToRead: number, handler: (data: number[]) => void): void;
    abstract i2cReadOnce(address: number, registerOrBytesToRead: number, bytesToReadOrHandler: (data: number[]) => void | number, handler?: (data: number[]) => void): void;
    abstract pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void;
    abstract serialRead(portId: number | string, handler: (data: number[]) => void): void;
    abstract serialRead(portId: number | string, maxBytesToRead: number, handler: (data: number[]) => void): void;
    abstract serialRead(portId: number | string, maxBytesToReadOrHandler: (data: number[]) => void | number, handler?: (data: number[]) => void): void;
    abstract i2cConfig(options: II2CConfig): void;
    abstract serialConfig(options: ISerialConfig): void;
    abstract servoConfig(options: IServoConfig): void;
    abstract servoConfig(pin: number, min: number, max: number): void;
    abstract servoConfig(optionsOrPin: IServoConfig | number, min?: number, max?: number): void;
    abstract serialStop(portId: number | string): void;
    abstract serialClose(portId: number | string): void;
    abstract serialFlush(portId: number | string): void;
    abstract normalize(pin: number | string): number;
}
