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