import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[noLeadingZeros]'
})
export class NoLeadingZerosDirective {
    
    constructor(
        private _ngControl: NgControl,
    ) {}
    
    @HostListener('keydown', ['$event'])
    handleInput(event: KeyboardEvent) {
        this.blockZeroKey(event, event.key);
    }

    @HostListener('compositionupdate', ['$event'])
    handleIMEInput(event: CompositionEvent) {
        this.blockZeroKey(event, event.data);
    }

    @HostListener('paste', ['$event'])
    handlePaste(event: ClipboardEvent) {
        event.preventDefault();
        
        const content = event.clipboardData?.getData('text');
        const trimmedValue = content?.replace(/\s+/g, '') ?? '';
        const noLeadingZeros = parseInt(trimmedValue).toString();
        
        this._ngControl.control?.setValue(noLeadingZeros);
    }

    blockZeroKey(event: Event, input: string): void {
        const currentValue: string = this._ngControl.value.toString() ?? '';
        const hasLeadingZero = currentValue.startsWith('0');
        const isNumberKey = new RegExp(/\d/).test(input);

        
        if (hasLeadingZero && isNumberKey) {
            event.preventDefault();
            this._ngControl.control?.setValue('');
        }
    }
}