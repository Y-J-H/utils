/**
 * 文件下载
 * @param url 地址
 * @param multiple 是否支持同时下载多个文件
 */
export default function downloadFiles(url: string, multiple?: boolean): void {
  if (multiple) {
    // 支持多个文件同时下载，利用 iframe 标签不会互相影响的特性，a 标签就不行。
    const tempElement = document.createElement('iframe')
    tempElement.style.display = 'none'
    tempElement.style.height = '0'
    tempElement.src = url
    document.body.appendChild(tempElement)
    setTimeout(() => {
      tempElement.remove()
    }, 5 * 60 * 1000)
  } else {
    const tempElement = document.createElement('a')
    tempElement.style.display = 'none'
    tempElement.href = url
    document.body.appendChild(tempElement)
    tempElement.click()
    document.body.removeChild(tempElement)
  }
}
