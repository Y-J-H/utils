export function delay<T>(time: number): Promise<void>
export function delay<T>(time: number, value: T): Promise<T>

/**
 * 延迟执行函数，休眠函数
 * @param time 延迟的时间
 * @param value 延后一定时间后的返回值
 */
export default function delay<T>(time: number, value?: T): Promise<void | T> {
  return new Promise(resolve => setTimeout(() => resolve(value), time))
}
