import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function englishNumberFormatValidator(): ValidatorFn | null {
    return(control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value ?? '';
      var valid = new RegExp(/[^\a-\z\A-\Z0-9]/).test(value); // 排除特殊符號
      if (!value) return null;
      if(!valid) return null;
      return { englishNumberInvalid: `請輸入英或數字` };
    }
}
