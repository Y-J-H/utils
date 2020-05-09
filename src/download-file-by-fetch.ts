/**
 * 从响应头 content-disposition 里获取文件名
 * @param res fetch 的响应
 */
function _getFileName(res: Response): string {
  const dispositionInfo = res.headers.get('content-disposition')
  let filename = ''
  if (dispositionInfo) {
    try {
      filename = decodeURI(dispositionInfo.split('filename=')[1])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
  return filename
}

/**
 * 使用 fetch 请求下载文件
 * @param addr 下载地址
 * @param options fetch 的配置信息
 * @param successCallback 接口成功返回的回调
 * @param failCallback 接口失败的回调
 * @param finishCallback 下载完成的回调
 * @param context fetch 函数，用来覆盖原生的 fetch
 */
export default function downloadFileByFetch(
  addr: string,
  options?: RequestInit,
  successCallback?: () => void,
  failCallback?: (err?: any) => void,
  finishCallback?: () => void,
  context = fetch
): void {
  context(addr, options)
    .then(res => {
      if (successCallback) successCallback()

      res.blob().then(blob => {
        if (blob.type === 'application/json') {
          failCallback && failCallback(res)
          return
        }
        const filename = _getFileName(res)

        // eslint-disable-next-line no-extra-boolean-cast
        if (!!window.navigator.msSaveOrOpenBlob) {
          // 兼容 ie10+
          navigator.msSaveBlob(blob, filename)
        } else {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = filename || url
          a.style.visibility = 'hidden'
          document.body.appendChild(a)
          a.click()
          a.remove()
          window.URL.revokeObjectURL(url)
        }
        if (finishCallback) finishCallback()
      })
    })
    .catch(err => {
      failCallback && failCallback(err)
    })
}
