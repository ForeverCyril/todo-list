/**
 * UUID(V4)生成器
 * @returns {string} uuid_v4
 */
export function uuidV4(){
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}

/**
 * 检测空字符串
 * @param str
 * @returns {boolean}
 */
export function isBlankStr(str){
    return str === undefined || str === null || str.trim() === "";
}

