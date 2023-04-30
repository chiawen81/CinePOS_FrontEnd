import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[toUpperCase]'
})
export class UppercaseDirective {

  constructor(
    private _ngControl: NgControl,
  ) { }

  @HostListener('input', ['$event'])
  handleInput(event: KeyboardEvent){
    const inputElement = event.currentTarget as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
    this._ngControl.control?.setValue(inputElement.value);
    this._ngControl.control?.updateValueAndValidity();
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const content = event.clipboardData?.getData('text');
    const upperCased = content?.replace(/\s+/g, '').toUpperCase();

    this._ngControl.control?.setValue(upperCased);
    this._ngControl.control?.updateValueAndValidity();
  }
}
