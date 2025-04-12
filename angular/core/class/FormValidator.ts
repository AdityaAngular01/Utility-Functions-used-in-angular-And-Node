//@ts-ignore
import { FormGroup } from "@angular/forms";

export class FormValidator {
  private form!: FormGroup;
  private invalidInputClass = '!border-red-500 !ring-red-700';
  constructor(form: FormGroup) {
    this.form = form;
  }

  checkInputFields(field: string, errors: string[]) {
    const control = this.form.get(field);

    if (!control) return false; 

    return (
      (control.touched || control.dirty) &&
      errors.some((error) => control.hasError(error))
    );
  }
}