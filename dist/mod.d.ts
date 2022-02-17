import type { UnitCompiler } from '@ddu6/stc';
export declare class RateBar {
    readonly element: HTMLDivElement;
    rate: number;
    constructor();
    render(): void;
    getValue(): number;
    setValue(value: number): void;
}
export declare function rateToScale(rate: number, max: number): number;
export declare function scaleToRate(scale: number, max: number): number;
export declare function prettyTime(time: number): string;
export declare const player: UnitCompiler;
