/**
 * 常用正则表达式：username, password, email, phone, ip, port, url, subnetMask
 */
export default {
  username: /^[0-9a-zA-Z_]{1,}$/,
  password: /^[a-zA-Z0-9`!@#%()_+=[{\]}\\|/'"~,.?-\s]*$/,
  email: /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+\.){1,63}[a-zA-Z0-9]+$/,
  phone: /^1[345789]\d{9}$/,
  ip: /^(([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.((0)|([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.((0)|([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.((0)|([1-9]\d?)|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/,
  port: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
  url: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([?&]\w+=\w*)*$/,
  subnetMask: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/
}
