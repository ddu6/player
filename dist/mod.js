import { Div, Checkbox, NumberBar, TimeBar } from '@ddu6/stui';
const players = [];
export function show() {
    for (const { element } of players) {
        const { top, height } = element.getBoundingClientRect();
        const mid = top + height / 2;
        if (mid >= 0 && mid <= window.visualViewport.height) {
            document.documentElement.classList.add('showing');
            element.scrollIntoView();
            return;
        }
    }
}
export function exit() {
    document.documentElement.classList.remove('showing');
}
export function listen(full = false) {
    addEventListener('keydown', async (e) => {
        if (full && e.key === 'Enter') {
            show();
            return;
        }
        if (full && e.key === 'Escape') {
            exit();
            return;
        }
        for (const { element, listener } of players) {
            const { top, height } = element.getBoundingClientRect();
            const mid = top + height / 2;
            if (mid >= 0 && mid <= window.visualViewport.height) {
                await listener(e);
                return;
            }
        }
    });
}
export const player = async (unit, compiler) => {
    const element = new Div();
    const video = document.createElement('video');
    const toolBar = new Div(['tool bar']);
    const bars = {
        time: new TimeBar('time', 0),
        speed: new NumberBar('speed', 0.2, 1, 5, true),
        brightness: new NumberBar('brightness', 0.1, 1, 10, true)
    };
    const checkboxes = {
        play: new Checkbox('play')
    };
    element
        .append(video)
        .append(toolBar
        .append(new Div()
        .append(checkboxes.play)
        .append(bars.time))
        .append(new Div()
        .append(bars.speed)
        .append(bars.brightness)));
    const params = new URLSearchParams(document.location.search);
    const src = unit.options.src ?? params.get('player-src') ?? document.documentElement.dataset.playerSrc ?? '';
    if (typeof src === 'string' && src.length > 0) {
        video.src = src;
    }
    const time = Number(unit.options.time ?? params.get('player-time') ?? document.documentElement.dataset.playerTime ?? '');
    if (time > 0) {
        video.currentTime = time;
    }
    bars.time.inputListeners.push(async (value) => {
        video.currentTime = value;
    });
    bars.speed.inputListeners.push(async (value) => {
        video.playbackRate = value;
    });
    bars.brightness.inputListeners.push(async (value) => {
        video.style.filter = `brightness(${value})`;
    });
    checkboxes.play.addEventListener('click', async () => {
        if (checkboxes.play.classList.contains('checking')) {
            return;
        }
        checkboxes.play.classList.add('checking');
        if (checkboxes.play.classList.contains('play')) {
            await video.play();
        }
        else {
            video.pause();
        }
        checkboxes.play.classList.remove('checking');
    });
    video.addEventListener('loadedmetadata', () => {
        bars.time.setMax(video.duration);
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
        checkboxes.play.classList.remove('play');
        checkboxes.play.classList.add('pause');
    });
    video.addEventListener('pause', () => {
        checkboxes.play.classList.add('play');
        checkboxes.play.classList.remove('pause');
    });
    video.addEventListener('ended', () => {
        checkboxes.play.classList.add('play');
        checkboxes.play.classList.remove('pause');
    });
    video.addEventListener('timeupdate', () => {
        bars.time.setValue(video.currentTime);
    });
    video.addEventListener('ratechange', () => {
        bars.speed.setValue(video.playbackRate);
    });
    video.addEventListener('click', () => {
        toolBar.classList.toggle('hide');
    });
    players.push({
        element: video,
        listener: async (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                checkboxes.play.element.click();
                return;
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                video.currentTime -= 10;
                return;
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                video.currentTime += 10;
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                await bars.brightness.changeValue(0.1);
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                await bars.brightness.changeValue(-0.1);
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
        }
    });
    return element.element;
};
