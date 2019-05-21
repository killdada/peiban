export const gitRegex = /^git@(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i

export const urlRegex = /^(http[s]?:)?\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i

/*
 /^
    (http[s]?:)?\/\/  协议 'http://' or 'https://' or '//'
    (25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}  ip 地址
    (:([1-9]\d{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?  端口号
    (\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?   资源路径
 $/i
*/
export const urlIpRegex = /^(http[s]?:)?\/\/(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}(:([1-9]\d{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$/i

export const mobileRegex = /^1[0-9]{10}$/

export const emailRegex = /^[0-9a-zA-Z_]+@(([0-9a-zA-Z]+)[.]){1,2}[a-z]{2,3}$/

export const domainRegex = /^[a-zA-z0-9]+-?\w+(\.\w+)+/
