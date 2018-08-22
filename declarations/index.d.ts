/// <reference types="node" />
import { EventEmitter } from 'events';
export interface IAbstractIO {
    isReady: boolean;
    readonly MODES: {
        INPUT: number;
        OUTPUT: number;
        ANALOG: number;
        PWM: number;
        SERVO: number;
    };
}
export declare class AbstractIO extends EventEmitter implements IAbstractIO {
    isReady: boolean;
    readonly MODES: {
        INPUT: number;
        OUTPUT: number;
        ANALOG: number;
        PWM: number;
        SERVO: number;
    };
}
