export function createRateBar() {
    const element = document.createElement('div');
    element.classList.add('rate-bar');
    let rate = .5;
    function render() {
        const percent = rate * 100;
        element.style.background = `linear-gradient(to right, var(--color-variable) ${percent}%, var(--color-area) ${percent}%)`;
    }
    function getValue() {
        return rate;
    }
    function setValue(value) {
        if (!isFinite(value)) {
            return;
        }
        if (value < 0) {
            value = 0;
        }
        else if (value > 1) {
            value = 1;
        }
        rate = value;
        render();
    }
    element.addEventListener('click', e => {
        setValue(e.offsetX / element.offsetWidth);
    });
    render();
    return {
        element,
        getValue,
        setValue
    };
}
export function rateToScale(rate, max) {
    return Math.exp((rate - .5) * 2 * Math.log(max));
}
export function scaleToRate(scale, max) {
    return Math.log(scale) / Math.log(max) / 2 + .5;
}
export function prettyTime(time) {
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
export const player = async (unit, compiler) => {
    const element = document.createElement('div');
    const video = document.createElement('video');
    const panel = document.createElement('div');
    const first = document.createElement('div');
    const second = document.createElement('div');
    const button = document.createElement('button');
    const timeBar = createRateBar();
    const timeVal = document.createElement('div');
    const speedBar = createRateBar();
    const speedVal = document.createElement('div');
    const brightnessBar = createRateBar();
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
    const { src, time } = unit.options;
    if (typeof src === 'string') {
        video.src = src;
    }
    if (typeof time === 'number' && isFinite(time) && time > 0) {
        video.currentTime = time;
    }
    for (const key of videoAttrs) {
        let val = unit.options[key] ?? compiler.extractor.extractLastGlobalOption(key, 'player', compiler.context.tagToGlobalOptions);
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
    timeVal.textContent = prettyTime(0);
    speedVal.textContent = '1.0';
    brightnessVal.textContent = '1.0';
    function updateBrightness() {
        const scale = rateToScale(brightnessBar.getValue(), 10);
        video.style.filter = `brightness(${scale})`;
        brightnessVal.textContent = scale.toFixed(1);
    }
    video.addEventListener('click', () => {
        panel.classList.toggle('hide');
    });
    button.addEventListener('click', async () => {
        if (button.classList.contains('pushing')) {
            return;
        }
        button.classList.add('pushing');
        if (button.classList.contains('play')) {
            await video.play();
        }
        else {
            video.pause();
        }
        button.classList.remove('pushing');
    });
    timeBar.element.addEventListener('click', () => {
        const value = timeBar.getValue() * video.duration;
        const { seekable } = video;
        for (let i = 0; i < seekable.length; i++) {
            if (seekable.start(i) <= value && value <= seekable.end(i)) {
                video.currentTime = value;
                timeVal.textContent = prettyTime(video.currentTime);
                return;
            }
        }
    });
    speedBar.element.addEventListener('click', () => {
        video.playbackRate = Math.exp((speedBar.getValue() - .5) * 2 * Math.log(5));
    });
    brightnessBar.element.addEventListener('click', updateBrightness);
    video.addEventListener('loadedmetadata', () => {
        timeVal.textContent = prettyTime(video.duration);
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
        if (now - lastUpdate < 500) {
            return;
        }
        lastUpdate = now;
        timeBar.setValue(video.currentTime / video.duration);
        timeVal.textContent = prettyTime(video.currentTime);
    });
    video.addEventListener('ratechange', () => {
        const scale = video.playbackRate;
        speedBar.setValue(scaleToRate(scale, 5));
        speedVal.textContent = scale.toFixed(1);
    });
    button.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            video.currentTime -= 10;
            timeVal.textContent = prettyTime(video.currentTime);
            return;
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            video.currentTime += 10;
            timeVal.textContent = prettyTime(video.currentTime);
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
    video.append(await compiler.compileInlineSTDN(unit.children));
    return element;
};
