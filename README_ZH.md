# clipboard_keyboard

[中文文档](./README_ZH.md) | [English Doc](./README.md)

## 安装
> npm i --save clipboard_keyboard

## 使用
```typescript

const pasteRef = useRef<ClipboardPaste>();
useEffect(() => {
  pasteRef.current = new ClipboardPaste();
}, [])

useEffect(() => {
  document.addEventListener('keydown', (evt: KeyboardEvent) => {
    if (!(evt.ctrlKey || evt.metaKey)) return
    if (evt.key === 'c') {
      const times = new Date().getTime()
      pasteRef.current?.setCopyValue(times.toString())
    } else if (evt.key === 'v') {
      pasteRef.current?.getPasteValue().then(res => { console.log(res) })
    }
  })
}, [])

```
## API
仅有三个API

- setCopyValue(value: string)
- getPasteValue(): string
- dispose(): void     remove event listener
## Why
如你所见，如果你想要使用这个库，必须监听keydown事件，并且evt.key的值是'c'或者'v'。

你可以通过这个库获取到剪切板中的数据。

