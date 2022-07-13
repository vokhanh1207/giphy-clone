import { Directive, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appFileSelect]',
  host: {
    '(click)': 'handleClick()'
  }
})
export class FileSelectDirective implements OnInit {

  /**
   * Reference to the file input element
   * which we use to open the file browser.
   */
  private input: HTMLInputElement = null;

  /**
   * Emits when the user has selected a file
   * from the file browser window.
   */
  @Output() change: EventEmitter<File[]> = new EventEmitter<File[]>();

  ngOnInit() {
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('accept', 'image/gif');
    this.input.setAttribute('multiple', '');

    this.input.onchange = (ev: Event) => {
      this.change.emit(Array.from(this.input.files));
      this.input.value = null;
    };
  }

  /**
   * Opens the file browser window
   */
  handleClick() {
    this.input.click();
  }

}
