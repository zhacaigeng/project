/**
 * 
 * @param {*} text 
 * @returns 
 */
export function isSwiftCode(text) {
    return /^[a-zA-Z]{6}[0-9a-zA-Z]{2,5}$/.test(text);
}