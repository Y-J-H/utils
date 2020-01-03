/**
 * 播放音频
 * @param url 音频文件路径
 */
export default function handlePlayAudio(url: string): void {
  const $audio = document.createElement('audio')
  const $body = document.body

  $audio.src = url
  $audio.style.display = 'none'
  $audio.autoplay = true
  $body.appendChild($audio)

  $audio.play().catch(e => {
    $audio.remove()
    // eslint-disable-next-line no-console
    console.log('播放声音出错：', e)
    return false
  })

  $audio.addEventListener('ended', () => {
    $audio.remove()
  })
}
