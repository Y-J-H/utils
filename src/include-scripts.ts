/**
 * 加载外部 js 文件，支持串行加载多个文件
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
    const $script = document.createElement('script')
    $script.type = 'text/javascript'
    $script.onload = () => {
      $script.onload = null
      if (index !== len) {
        loadScript(index + 1)
      } else {
        if (callback) callback()
      }
    }
    $script.src = allScriptFiles[index]
    $head.appendChild($script)
  }

  loadScript(0)
}
