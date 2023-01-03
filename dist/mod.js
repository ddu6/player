var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RateBar {
    constructor() {
        this.element = document.createElement('div');
        this.rate = .5;
        this.element.classList.add('rate-bar');
        this.element.addEventListener('click', e => {
            this.setValue(e.offsetX / this.element.offsetWidth);
        });
        this.render();
    }
    render() {
        this.element.style.setProperty('--rate', this.rate.toString());
    }
    getValue() {
        return this.rate;
    }
    setValue(value) {
        if (!isFinite(value)) {
            return;
        }
        if (value < 0) {
            value = 0;
        }
        else if (value > 1) {
            value = 1;
        }
        this.rate = value;
        this.render();
    }
}
export function rateToScale(rate, max) {
    return Math.exp((rate - .5) * 2 * Math.log(max));
}
export function scaleToRate(scale, max) {
    return Math.log(scale) / Math.log(max) / 2 + .5;
}
export function prettyTime(time) {
    if (!isFinite(time)) {
        time = 0;
    }
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    const string = m + ':' + s;
    if (time <= 3600) {
        return string;
    }
    return Math.floor(time / 3600).toString() + ':' + string;
}
const videoAttrs = [
    'autoplay',
    'controls',
    'crossorigin',
    'loop',
    'muted',
    'poster',
    'preload',
];
export const player = (unit, compiler) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const element = document.createElement('div');
    const video = document.createElement('video');
    const panel = document.createElement('div');
    const first = document.createElement('div');
    const second = document.createElement('div');
    const button = document.createElement('button');
    const timeBar = new RateBar();
    const timeVal = document.createElement('div');
    const speedBar = new RateBar();
    const speedVal = document.createElement('div');
    const brightnessBar = new RateBar();
    const brightnessVal = document.createElement('div');
    element.append(video);
    element.append(panel);
    panel.append(first);
    panel.append(second);
    first.append(button);
    first.append(timeBar.element);
    first.append(timeVal);
    second.append(new Text('Speed'));
    second.append(speedBar.element);
    second.append(speedVal);
    second.append(new Text('Brightness'));
    second.append(brightnessBar.element);
    second.append(brightnessVal);
    panel.classList.add('hide');
    button.classList.add('show-icon');
    button.classList.add('play');
    timeBar.setValue(0);
    timeVal.textContent = `${prettyTime(0)}/${prettyTime(0)}`;
    speedVal.textContent = '1.0';
    brightnessVal.textContent = '1.0';
    function setCurrentTime(value) {
        const { seekable } = video;
        for (let i = 0; i < seekable.length; i++) {
            if (seekable.start(i) <= value && value <= seekable.end(i)) {
                video.currentTime = value;
                timeVal.textContent = `${prettyTime(video.currentTime)}/${prettyTime(video.duration)}`;
                return;
            }
        }
    }
    const { src, time } = unit.options;
    if (typeof src === 'string') {
        video.src = compiler.context.urlToAbsURL(src, unit);
    }
    if (typeof time === 'number' && isFinite(time) && time > 0) {
        setCurrentTime(time);
    }
    for (const key of videoAttrs) {
        let val = (_a = unit.options[key]) !== null && _a !== void 0 ? _a : compiler.context.extractLastGlobalOption(key, 'player');
        if (val === true) {
            val = '';
        }
        if (typeof val !== 'string') {
            continue;
        }
        try {
            video.setAttribute(key, val);
        }
        catch (err) {
            console.log(err);
        }
    }
    function updateBrightness() {
        const scale = rateToScale(brightnessBar.getValue(), 10);
        video.style.setProperty('--brightness', scale.toString());
        brightnessVal.textContent = scale.toFixed(1);
    }
    video.addEventListener('click', () => {
        panel.classList.toggle('hide');
    });
    button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        if (button.classList.contains('pushing')) {
            return;
        }
        button.classList.add('pushing');
        if (button.classList.contains('play')) {
            yield video.play();
        }
        else {
            video.pause();
        }
        button.classList.remove('pushing');
    }));
    timeBar.element.addEventListener('click', () => {
        setCurrentTime(timeBar.getValue() * video.duration);
    });
    speedBar.element.addEventListener('click', () => {
        video.playbackRate = Math.exp((speedBar.getValue() - .5) * 2 * Math.log(5));
    });
    brightnessBar.element.addEventListener('click', updateBrightness);
    video.addEventListener('loadedmetadata', () => {
        timeVal.textContent = `${prettyTime(video.currentTime)}/${prettyTime(video.duration)}`;
        element.classList.remove('loading');
    });
    video.addEventListener('playing', () => {
        element.classList.remove('loading');
    });
    video.addEventListener('waiting', () => {
        element.classList.add('loading');
    });
    video.addEventListener('error', () => {
        element.classList.add('error');
    });
    video.addEventListener('play', () => {
        button.classList.remove('play');
        button.classList.add('pause');
    });
    video.addEventListener('pause', () => {
        button.classList.add('play');
        button.classList.remove('pause');
    });
    video.addEventListener('ended', () => {
        button.classList.add('play');
        button.classList.remove('pause');
    });
    let lastUpdate = 0;
    video.addEventListener('timeupdate', () => {
        const now = Date.now();
        if (now - lastUpdate < 500 && video.currentTime !== video.duration) {
            return;
        }
        lastUpdate = now;
        timeBar.setValue(video.currentTime / video.duration);
        timeVal.textContent = `${prettyTime(video.currentTime)}/${prettyTime(video.duration)}`;
    });
    video.addEventListener('ratechange', () => {
        const scale = video.playbackRate;
        speedBar.setValue(scaleToRate(scale, 5));
        speedVal.textContent = scale.toFixed(1);
    });
    button.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setCurrentTime(video.currentTime - 10);
            return;
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            setCurrentTime(video.currentTime + 10);
            return;
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            brightnessBar.setValue(scaleToRate(rateToScale(brightnessBar.getValue(), 10) + .1, 10));
            updateBrightness();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            brightnessBar.setValue(scaleToRate(rateToScale(brightnessBar.getValue(), 10) - .1, 10));
            updateBrightness();
            return;
        }
        if (e.key === '[') {
            e.preventDefault();
            video.playbackRate = Math.max(0.2, video.playbackRate - 0.1);
            return;
        }
        if (e.key === ']') {
            e.preventDefault();
            video.playbackRate = Math.min(5, video.playbackRate + 0.1);
            return;
        }
    });
    video.append(yield compiler.compileInlineSTDN(unit.children));
    return element;
});
