import { FormGroup } from '@angular/forms';

export function updateValueAndValidity(form: FormGroup) {
  Object.values(form.controls).forEach(control => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });

      if (control instanceof FormGroup) {
        updateValueAndValidity(control);
      }
    }
  });
}
