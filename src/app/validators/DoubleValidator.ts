import { AbstractControl, ValidatorFn } from '@angular/forms';

export function doubleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (isNaN(value) || value === null || value === undefined) {
      return {'notDouble': {value: control.value}};
    }
    return null;
  };
}
