import EE from 'onfire.js'

interface IDispose {
  dispose: () => void;
}

enum EventType {
  KEYDOWN = 'keydown',
  KEYUP = 'keyup',
  COPY = 'copy',
  PASTE = 'paste'
}

const isMac = () => navigator.userAgent.indexOf('Mac') > 0

const isWin = () => navigator.userAgent.indexOf('Win') > 0

const PASTE = 'paste'

export class ClipboardPaste implements IDispose {
  private PasteValue$ = new EE();
  private onAfter: () => void = () => { }

  constructor(onAfter?: () => void) {
    this.initTextInput();
    this.init();
    if (onAfter)
      this.onAfter = onAfter
  }

  dispose() {
    document.removeEventListener(EventType.KEYDOWN, this.onKeydown)
    document.removeEventListener(EventType.KEYUP, this.onKeyup)
    document.removeEventListener(EventType.COPY, this.onCopy)
    document.removeEventListener(EventType.PASTE, this.onPaste)
  };


  setCopyValue(value: string) {
    this.copyValue = value;
    this.textInput.focus();
    this.textInput.select();
  }

  getPasteValue() {
    this.textInput.focus();
    this.textInput.select();
    return new Promise(resolve => {
      this.PasteValue$.on(PASTE, value => {
        resolve(value)
      })
    })
  }

  private onKeydown(event) {
    const evt = event as KeyboardEvent;
    const source = evt.target;
    if (source?.['nodeName'] !== 'INPUT') {
      if (
        evt.keyCode == 224 /* FF */ || (isWin() && evt.keyCode == 17 /* Control */) ||
        (isMac() && (evt.keyCode == 91 || evt.keyCode == 93) /* Left/Right Meta */)
      ) {
        if (!this.restoreFocus) {
          this.textInput.style.position = 'fixed';
          document.getElementsByTagName('body')[0]?.appendChild(this.textInput)

          this.restoreFocus = true;
        }
      }
    }
  }

  private onKeyup(event) {
    const evt = event as KeyboardEvent
    if (this.restoreFocus && (
      evt.keyCode == 224 /* FF */ || evt.keyCode == 17 /* Control */ ||
      evt.keyCode == 91 || evt.keyCode == 93 /* Meta */)
    ) {
      this.restoreFocus = false;
      if (this.textInput === document.activeElement) {
        setTimeout(() => {
          this.onAfter();
        }, 0);
      }
      this.textInput?.parentNode?.removeChild(this.textInput);
    }
  }

  private onCopy() {
    this.textInput.value = this.copyValue
    this.textInput.select();
  }

  private onPaste() {
    const val = this.textInput.value;
    this.textInput.value = ''
    setTimeout(() => {
      this.PasteValue$.fire(PASTE, val)
    }, 0);
    this.textInput.select();
  }

  private init() {
    document.addEventListener(EventType.KEYDOWN, this.onKeydown.bind(this))

    document.addEventListener(EventType.KEYUP, this.onKeyup.bind(this))

    document.addEventListener(EventType.COPY, this.onCopy.bind(this))

    document.addEventListener(EventType.PASTE, this.onPaste.bind(this))
  }

  private initTextInput() {
    this.textInput.style.opacity = '0'
    this.textInput.style.width = '1px';
    this.textInput.style.height = '1px';
  }

  private textInput: HTMLTextAreaElement = document.createElement('textarea');
  private restoreFocus: boolean = false;
  private copyValue: string = ''
}