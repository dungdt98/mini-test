import { AbstractControl } from '@angular/forms';

// 1. custom validate not null
export function ValidatorNotNull(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value == 'null' || control.value == null || control.value == '' || control.value.trim() == '')
    return { notNull: true };
  return null;
}

