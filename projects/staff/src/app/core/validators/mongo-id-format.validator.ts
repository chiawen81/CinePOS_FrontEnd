import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function mongoIdFormatValidator(): ValidatorFn | null {
    return(control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value ?? '';
      var valid = new RegExp(/[^\a-\z\A-\Z0-9]/).test(value); // 排除特殊符號
      var valueLength: number = value.length;
      if (!value) return null;
      if(!valid && valueLength === 24) return null;
      return { mongoIdInvalid: `請輸入英數混合24位數` };
    }
}
