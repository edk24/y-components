import {  ref } from 'vue';

type PLAY_STATE = 'play' | 'pause';

const script = document.createElement('script');
script.src = 'https://cdn.bootcdn.net/ajax/libs/SoundJS/1.0.2/soundjs.min.js';
script.type = 'text/javascript';


type BgMusicOptions = {
    /** 音频文件 mp3 */
    src: string,
    /** 声音 0.1 ~ 1 */
    volume?: number
    /** 循环次数，默认 999 */
    loop?: number
}

export const useBgMusic = (options: BgMusicOptions = {
    src: '',
    volume: 0.1,
    loop: 999
}) => {
    const musicLoadComplete = ref(false);
    let musicInstance: any = null;

    // 动态加载音频库
    script.onload = () => {
        // 注册音频加载完成事件
        createjs.Sound.alternateExtensions = ['mp3'];
        createjs.Sound.on('fileload', () => {
            musicLoadComplete.value = true;
        }, window);

        // 注册音频
        createjs.Sound.registerSound(options.src, 'sound');
    }
    // 预防重复加载
    if (script.parentElement === null) {
        document.body.appendChild(script);
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
            return;
        }

        // 不存在音频实例，等待音频加载完成后播放
        const timer = setInterval(() => {
            if (window.createjs && musicLoadComplete.value) {
                clearInterval(timer);
                musicInstance = createjs.Sound.play('sound');
                musicInstance.loop = options.loop;
                musicInstance.volume = options.volume;
            }
        }, 300);
    }

    /**
     * 暂停
     */
    function pause() {
        musicInstance.paused = true
    }

    /**
     * 销毁
     */
    function destroy() {
        musicInstance.stop();
        musicInstance = null;
    }

    return {
        getState,
        play,
        pause,
        destroy
    }
}
