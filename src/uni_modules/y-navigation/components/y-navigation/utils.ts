/**
 * 对比微信小程序基础库版本
 * 
 * @param version 需要对比的版本
 * @returns >= 0 表示当前版本大于等于对比版本，< 0 表示当前版本小于对比版本
 */
export function compareVersion(version: string): number {
    const v1 = uni.getAppBaseInfo().SDKVersion.split('.')
    const v2 = version.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}


/**
 * 获取导航栏信息
 */
export function getNavigationBarInfo() {
    const statusBarHeight = getStatusBarHeight()

    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    console.log((menuButtonInfo.height  + menuButtonInfo.bottom) - statusBarHeight - menuButtonInfo.top)

    return {
        statusBarHeight,
        navigationHeight: (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height 
    }
}


function getStatusBarHeight() {
    // #ifndef MP-WEIXIN
    return uni.getWindowInfo().statusBarHeight || 1;
    // #endif

    // #ifdef MP-WEIXIN
    if (compareVersion('2.20.1') >= 0) {            // 2.20.1 以上版本支持
        return uni.getWindowInfo().statusBarHeight;
    } else {
        return uni.getSystemInfoSync().statusBarHeight || 0;
    }
    // #endif
}