import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noWhiteSpace]'
})
export class NoWhiteSpaceDirective {

  constructor(
    private _ngControl: NgControl,
  ) { }

  @HostListener('keydown', ['$event'])
  handleInput(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    
    const content = event.clipboardData?.getData('text');
    const trimmedValue = content?.replace(/\s+/g, '');
    
    this._ngControl.control?.setValue(trimmedValue);
    this._ngControl.control?.updateValueAndValidity();
  }
}
