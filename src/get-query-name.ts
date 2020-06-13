/**
 * 获取URL参数
 * @param name 需要获取的URL的name
 */

export default function getQueryName(name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const search = window.location.href.split('?')[1] || '';
    const r = search.match(reg) || [];
    return r[2];
}
