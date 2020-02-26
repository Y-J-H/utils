/**
 * 使用 fetch 请求下载文件
 * @param addr 下载地址
 * @param options fetch 的配置信息
 * @param successCallback 接口成功返回的回调
 * @param finishCallback 下载完成的回调
 */
export default function downloadFileByFetch(
  addr: string,
  options?: RequestInit,
  successCallback?: () => void,
  failCallback?: (err?: any) => void,
  finishCallback?: () => void
) {
  fetch(addr, options)
    .then(res => {
      if (successCallback) successCallback()
      res.blob().then(blob => {
        if (blob.type === 'application/json') {
          failCallback && failCallback()
          return
        }
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!window.navigator.msSaveOrOpenBlob) {
          // 兼容ie10
          navigator.msSaveBlob(blob)
        } else {
          const dispositionInfo = res.headers.get('content-disposition')
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          document.body.appendChild(a)
          a.href = url
          a.download = dispositionInfo
            ? decodeURI(dispositionInfo.split('filename=')[1])
            : url
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
