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
export declare type ReadHandler = (data: number[]) => void;
export declare abstract class AbstractIOCore extends EventEmitter {
    isReady: boolean;
    readonly MODES: {
        INPUT: Mode;
        OUTPUT: Mode;
        ANALOG: Mode;
        PWM: Mode;
        SERVO: Mode;
    };
    readonly pins: IPinConfiguration[];
    readonly analogPins: number[];
    readonly HIGH: number;
    readonly LOW: number;
    abstract readonly name: string;
    abstract readonly defaultLed: string | number;
    abstract pinMode(pin: string | number, mode: Mode): void;
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
    abstract i2cRead(address: number, bytesToRead: number, handler: ReadHandler): void;
    abstract i2cRead(address: number, register: number, bytesToRead: number, handler: ReadHandler): void;
    abstract i2cRead(address: number, registerOrBytesToRead: number, bytesToReadOrHandler: ReadHandler | number, handler?: ReadHandler): void;
    abstract i2cReadOnce(address: number, bytesToRead: number, handler: ReadHandler): void;
    abstract i2cReadOnce(address: number, register: number, bytesToRead: number, handler: ReadHandler): void;
    abstract i2cReadOnce(address: number, registerOrBytesToRead: number, bytesToReadOrHandler: ReadHandler | number, handler?: ReadHandler): void;
    abstract pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void;
    abstract serialRead(portId: number | string, handler: ReadHandler): void;
    abstract serialRead(portId: number | string, maxBytesToRead: number, handler: ReadHandler): void;
    abstract serialRead(portId: number | string, maxBytesToReadOrHandler: ReadHandler | number, handler?: ReadHandler): void;
    abstract i2cConfig(options: II2CConfig): void;
    abstract serialConfig(options: ISerialConfig): void;
    abstract servoConfig(options: IServoConfig): void;
    abstract servoConfig(pin: number, min: number, max: number): void;
    abstract servoConfig(optionsOrPin: IServoConfig | number, min?: number, max?: number): void;
    abstract serialStop(portId: number | string): void;
    abstract serialClose(portId: number | string): void;
    abstract serialFlush(portId: number | string): void;
    abstract sendOneWireConfig(): void;
    abstract sendOneWireSearch(): void;
    abstract sendOneWireAlarmsSearch(): void;
    abstract sendOneWireRead(): void;
    abstract sendOneWireReset(): void;
    abstract sendOneWireWrite(): void;
    abstract sendOneWireDelay(): void;
    abstract sendOneWireWriteAndRead(): void;
    abstract setSamplingInterval(): void;
    abstract stepperConfig(): void;
    abstract stepperStep(): void;
    abstract normalize(pin: number | string): number;
    analogWrite(pin: string | number, value: number): void;
    sendI2CConfig(options: II2CConfig): void;
    sendI2CWriteRequest(address: number, inBytes: number[]): void;
    sendI2CWriteRequest(address: number, register: number, inBytes: number[]): void;
    sendI2CReadRequest(address: number, bytesToRead: number, handler: ReadHandler): void;
    sendI2CReadRequest(address: number, register: number, bytesToRead: number, handler: ReadHandler): void;
    reset(): void;
    reportAnalogPin(): void;
    reportDigitalPin(): void;
    pulseIn(): void;
}
export declare class AbstractIO extends AbstractIOCore {
    readonly name: string;
    readonly defaultLed: string | number;
    pinMode(pin: string | number, mode: Mode): void;
    analogWrite(pin: string | number, value: number): void;
    pwmWrite(pin: string | number, value: number): void;
    servoWrite(pin: string | number, value: number): void;
    digitalWrite(pin: string | number, value: number): void;
    i2cWrite(address: number, inBytes: number[]): void;
    i2cWrite(address: number, register: number, inBytes: number[]): void;
    i2cWriteReg(address: number, register: number, value: number): void;
    serialWrite(portId: string | number, inBytes: number[]): void;
    analogRead(pin: string | number, handler: (value: number) => void): void;
    digitalRead(pin: string | number, handler: (value: Value) => void): void;
    i2cRead(address: number, bytesToRead: number, handler: ReadHandler): void;
    i2cRead(address: number, register: number, bytesToRead: number, handler: ReadHandler): void;
    i2cReadOnce(address: number, bytesToRead: number, handler: ReadHandler): void;
    i2cReadOnce(address: number, register: number, bytesToRead: number, handler: ReadHandler): void;
    pingRead(settings: IPingReadSettings, handler: (duration: number) => void): void;
    serialRead(portId: number | string, handler: ReadHandler): void;
    serialRead(portId: number | string, maxBytesToRead: number, handler: ReadHandler): void;
    i2cConfig(options: II2CConfig): void;
    serialConfig(options: ISerialConfig): void;
    servoConfig(options: IServoConfig): void;
    servoConfig(pin: number, min: number, max: number): void;
    serialStop(portId: number | string): void;
    serialClose(portId: number | string): void;
    serialFlush(portId: number | string): void;
    sendOneWireConfig(): void;
    sendOneWireSearch(): void;
    sendOneWireAlarmsSearch(): void;
    sendOneWireRead(): void;
    sendOneWireReset(): void;
    sendOneWireWrite(): void;
    sendOneWireDelay(): void;
    sendOneWireWriteAndRead(): void;
    setSamplingInterval(): void;
    stepperConfig(): void;
    stepperStep(): void;
    normalize(pin: number | string): number;
}
