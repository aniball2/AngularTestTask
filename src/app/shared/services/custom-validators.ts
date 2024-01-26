import { ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static dateLessThan(from: string, to: string): ValidatorFn {
    return (control): ValidationErrors | null => {
      const fromValue = control.get(from)?.value;
      const toValue = control.get(to)?.value;

      return toValue && new Date(fromValue) > new Date(toValue) ? { dates: true } : null;
    };
  }

  static numberLessThan(from: string, to: string): ValidatorFn {
    return (control): ValidationErrors | null => {
      const fromValue = control.get(from)?.value;
      const toValue = control.get(to)?.value;
      const hasError = fromValue && toValue && fromValue > toValue;

      return hasError ? { numberLessThan: true } : null;
    };
  }
}
