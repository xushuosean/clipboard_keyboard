# clipboard_keyboard

[中文文档](./README_ZH.md) | [English Doc](./README.md)

## Install
> npm i --save clipboard_keyboard

## Usage
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
just three APIs

- setCopyValue(value: string)
- getPasteValue(): string
- dispose(): void     remove event listener
## Why
As you see,if you want to use the package, you must add event listener to the keydown,and key will be 'c' or
 'v'.
You can read clipboard by this package

