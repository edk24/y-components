import './style.scss'

type PLAY_STATE = 'play' | 'pause';

// soundjs loader
const script = document.createElement('script');
script.src = 'https://cdn.bootcdn.net/ajax/libs/SoundJS/1.0.1/soundjs.min.js';
script.type = 'text/javascript';

// 控制按钮
const musicSvgImg = '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="36px" height="36px" fill="#fff">    <path d="M 11 3 L 11 4 L 11 8 L 11 14.541016 A 4 4 0 0 0 9 14 A 4 4 0 0 0 5 18 A 4 4 0 0 0 9 22 A 4 4 0 0 0 13 18 L 13 8 L 19 8 L 19 3 L 11 3 z"/></svg>'
const controlsDom = document.createElement('div');
controlsDom.className = 'y-bg-music-controls';
controlsDom.innerHTML = musicSvgImg

type BgMusicOptions = {
    /** 音频文件 mp3 */
    src: string,
    /** 循环次数，默认 999 */
    loop?: number
    /** 控制按钮 */
    controls?: boolean
}


interface IBgMusic {
    init: (options: BgMusicOptions) => void
    /** 获取播放状态 */
    getState: () => PLAY_STATE
    /** 播放 */
    play: () => Promise<void>
    /** 暂停 */
    pause: () => void
    /** 销毁 */
    destroy: () => void
}

class BgMusicAndroid implements IBgMusic {

    private musicInstance: any = null;
    private musicLoadComplete = false;
    private options: BgMusicOptions | null = null;
    private firstPlay = false;

    init(options: BgMusicOptions) {
        this.options = options;

        // 动态加载音频库
        script.onload = () => {
            // 注册音频加载完成事件
            // @ts-ignore
            createjs.Sound.alternateExtensions = ['mp3', 'ogg', 'wav'];
            // @ts-ignore
            createjs.Sound.on('fileload', () => {
                this.musicLoadComplete = true;
            });
            // @ts-ignore
            createjs.Sound.on('fileerror', (e:any) => {
                throw new Error(`[y-bg-music] 音频加载失败: ${e.src}`);
            });

            // 注册音频
            // @ts-ignore
            createjs.Sound.registerSound({ src: options.src, id: 'sound' });
        }
        // 预防重复加载
        if (script.parentElement === null) {
            document.body.appendChild(script);
        }
    }


    play() {
        return new Promise<void>((resolve) => {
            // 存在音频实例，直接恢复播放
            if (this.musicInstance && this.firstPlay) {
                this.musicInstance.paused = false;
                controlsDom.classList.add('y-bg-music-controls__player');
                resolve();
                return;
            }


            // 不存在音频实例，等待音频加载完成后播放
            const timer = setInterval(() => {
                // @ts-ignore
                if (window.createjs && this.musicLoadComplete && this.firstPlay === false) {
                    clearInterval(timer);
                    // @ts-ignore
                    this.musicInstance = createjs.Sound.play('sound');
                    this.musicInstance.loop = this.options?.loop;
                    controlsDom.classList.add('y-bg-music-controls__player');
                    this.firstPlay = true;
                    resolve();
                }
            }, 300);
        })
    }

    pause() {
        this.musicInstance.paused = true
        controlsDom.classList.remove('y-bg-music-controls__player');
    }

    destroy() {
        this.musicInstance.stop();
        this.musicInstance = null;
        controlsDom.classList.remove('y-bg-music-controls__show');
    }

    getState() {
        if (!this.musicInstance) {
            return 'pause';
        }

        return this.musicInstance.paused ? 'pause' : 'play';
    }
}


class BgMusicIos implements IBgMusic {

    private audioDom: HTMLAudioElement | null = null;

    init(options: BgMusicOptions) {
        this.audioDom = document.createElement('audio');
        this.audioDom.src = options.src;
        this.audioDom.loop = true;
        this.audioDom.preload = 'auto';
        this.audioDom.id = 'y-bg-music-audio';
        document.body.appendChild(this.audioDom);
    }

    play() {
        return new Promise<void>((resolve) => {
            this.audioDom?.play()
                .then(() => {
                    resolve();
                    controlsDom.classList.add('y-bg-music-controls__player');
                });
        })
    }

    pause() {
        this.audioDom?.pause();
        controlsDom.classList.remove('y-bg-music-controls__player');
    }

    destroy() {
        this.audioDom?.pause();
        this.audioDom?.remove();
        controlsDom.classList.remove('y-bg-music-controls__show');
    }

    getState() {
        if (!this.audioDom) {
            return 'pause';
        }

        return this.audioDom.paused ? 'pause' : 'play';
    }
}


export const useBgMusic = (options: BgMusicOptions) => {
    if (typeof options.controls === 'undefined') {
        options.controls = true;
    }

    if (typeof options.loop === 'undefined') {
        options.loop = 999;
    }

    let player: any = null;
    if (isAndroid()) {
        player = new BgMusicAndroid();
        player.init(options);
    } else {
        player = new BgMusicIos();
        player.init(options);
    } 


    // 控制按钮
    if (controlsDom.parentElement === null) {
        document.body.appendChild(controlsDom);

        if (options.controls) {
            controlsDom.classList.add('y-bg-music-controls__show');

            controlsDom.onclick = () => {
                if (player.getState() === 'play') {
                    player.pause();
                } else {
                    player.play();
                }
            }
        }
    }

    // 触摸自动播放
    document.addEventListener('touchend', () => {
        player.play();
    }, { once: true });


    return player
}


function isAndroid() {
    const u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}

function isIos() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}