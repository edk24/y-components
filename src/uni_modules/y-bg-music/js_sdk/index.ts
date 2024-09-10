import './style.scss'


type PLAY_STATE = 'play' | 'pause';

// soundjs loader
const script = document.createElement('script');
script.src = 'https://cdn.bootcdn.net/ajax/libs/SoundJS/1.0.2/soundjs.min.js';
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

export const useBgMusic = (options: BgMusicOptions) => {
    if (typeof options.controls === 'undefined') {
        options.controls = true;
    }

    if (typeof options.loop === 'undefined') {
        options.loop = 999;
    }

    let musicLoadComplete = false;
    let musicInstance: any = null;

    // 动态加载音频库
    script.onload = () => {
        // 注册音频加载完成事件
        createjs.Sound.alternateExtensions = ['mp3'];
        createjs.Sound.on('fileload', () => {
            musicLoadComplete = true;
        }, window);

        // 注册音频
        createjs.Sound.registerSound(options.src, 'sound');
    }
    // 预防重复加载
    if (script.parentElement === null) {
        document.body.appendChild(script);
    }
    if (controlsDom.parentElement === null) {
        document.body.appendChild(controlsDom);

        if (options.controls) {
            controlsDom.classList.add('y-bg-music-controls__show');

            controlsDom.onclick = () => {
                if (getState() === 'play') {
                    pause();
                } else {
                    play();
                }
            }
        }
    }
    
    /** 获取播放状态 */
    function getState():PLAY_STATE {
        if (!musicInstance) { 
            return 'pause';
        }

        return musicInstance.paused ? 'pause' : 'play';
    }

    /**
     * 播放
     * 
     * 请放到 wx.ready 回调中调用
     */
    function play() {
        // 存在音频实例，直接恢复播放
        if (musicInstance) {
            musicInstance.paused = false;
            controlsDom.classList.add('y-bg-music-controls__player');
            return;
        }

        // 不存在音频实例，等待音频加载完成后播放
        const timer = setInterval(() => {
            if (window.createjs && musicLoadComplete) {
                clearInterval(timer);
                musicInstance = createjs.Sound.play('sound');
                musicInstance.loop = options.loop;
                controlsDom.classList.add('y-bg-music-controls__player');
            }
        }, 300);
    }

    /**
     * 暂停
     */
    function pause() {
        musicInstance.paused = true
        controlsDom.classList.remove('y-bg-music-controls__player');

    }

    /**
     * 销毁
     */
    function destroy() {
        musicInstance.stop();
        musicInstance = null;
        controlsDom.classList.remove('y-bg-music-controls__show');
    }

    return {
        getState,
        play,
        pause,
        destroy
    }
}
