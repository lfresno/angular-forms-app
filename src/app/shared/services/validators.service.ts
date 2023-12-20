import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  //otra opción a la hora de centralizar validaciones

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true
      }
    }
    return null;
  }

  public isValidField( form:FormGroup, field: string ) {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo( field1: string, field2:string ) {
    //devuelvo la función que se usa para comparar
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      //guardamos el valor de cada uno de los campos para poder compararlos
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      //si los campos son distintos, se manda un error y se muestra en el segundo campo
      if(fieldValue1 != fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true});  //manda el error en el campo
        return { notEqual : true }; //manda el error en el formulario
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }


}
