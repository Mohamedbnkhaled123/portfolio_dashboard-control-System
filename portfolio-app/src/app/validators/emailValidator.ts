import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidators {
  // Custom Email Pattern Validator
  static validEmail() {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
      const value = control.value;

      if (!value) return null; // let required handle empty

      const isValid = emailPattern.test(value);
      return isValid ? null : { invalidEmail: true };
    };
  }
}
