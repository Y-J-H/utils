/**
 * 加载外部 js css 文件，支持串行加载多个文件
 * @param files 加载的文件
 * @param callback 加载成功后的回调
 */
export default function includeScripts(
  files: string | string[],
  callback?: () => void
): void {
  const allScriptFiles = Array.isArray(files) ? files : [files]
  const len = allScriptFiles.length - 1
  const $head = document.head || document.getElementsByTagName('head')[0]

  const loadScript = (index: number) => {
    const currentFile = allScriptFiles[index]
    const isLoadCss = currentFile.split('.').pop() === 'css'
    // eslint-disable-next-line init-declarations
    let $element: HTMLLinkElement | HTMLScriptElement
    if (isLoadCss) {
      $element = document.createElement('link')
      $element.rel = 'stylesheet'
      $element.href = currentFile
    } else {
      $element = document.createElement('script')
      $element.type = 'text/javascript'
      $element.src = currentFile
    }

    $element.onload = () => {
      $element.onload = null
      if (index !== len) {
        loadScript(index + 1)
      } else {
        if (callback) callback()
      }
    }

    $head.appendChild($element)
  }

  loadScript(0)
}
