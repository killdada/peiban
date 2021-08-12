export default function random(length) {
    let str = Math.random()
        .toString(36)
        .substr(2)
    if (str.length >= length) {
        return str.substr(0, length)
    }
    str += random(length - str.length)
    return str
}
