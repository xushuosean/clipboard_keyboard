import { fromEvent, lastValueFrom, Observable, Subject, Subscription } from "rxjs";

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
export class ClipboardPaste implements IDispose {
  private PasteValue$: Subject<string> = new Subject<string>()
  private subs: Subscription[] = []
  private onAfter: () => void = () => { }

  constructor(onAfter?: () => void) {
    this.initTextInput();
    this.subs = this.init();
    if (onAfter)
      this.onAfter = onAfter
  }

  dispose() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
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
      this.PasteValue$.subscribe(value => {
        resolve(value)
      })
    })
  }

  private isCopyKey(evt: KeyboardEvent) {
    return (isMac() && evt.key === 'c') || (isWin() && evt.key === 'c')
  }

  private isPasteKey(evt: KeyboardEvent) {
    return (isMac() && evt.key === 'v') || (isWin() && evt.key === 'v')
  }

  private init() {
    const keyDown = fromEvent(document, EventType.KEYDOWN).subscribe((event) => {
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
    })

    const keyUp = fromEvent(document, EventType.KEYUP).subscribe((event) => {
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
    })

    const copy = fromEvent(this.textInput, EventType.COPY).subscribe((event) => {
      this.textInput.value = this.copyValue
      this.textInput.select();
    })

    const paste = fromEvent(this.textInput, EventType.PASTE).subscribe(() => {
      this.textInput.value = ''
      setTimeout(() => {
        this.PasteValue$.next(this.textInput.value)
      }, 0);
      this.textInput.select();
    })

    return [keyDown, keyUp, copy, paste]
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