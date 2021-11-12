import { Shell, Div, Checkbox, NumberBar, TimeBar } from '@ddu6/stui';
export declare class Player extends Shell {
    readonly videoEle: HTMLVideoElement;
    readonly toolBar: Div;
    readonly bars: {
        time: TimeBar;
        speed: NumberBar;
        brightness: NumberBar;
    };
    readonly checkboxes: {
        play: Checkbox;
    };
    constructor();
}
