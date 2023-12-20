import { FormControl, ValidationErrors } from "@angular/forms";

//este archivo sirve para centralizar todas las validaciones

//las validaciones son ASÍNCRONAS cuando usan observables, timers o promesas. Si no lo hacen, son SÍNCRONAS

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

//para controlar el formato del email
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const cantBeStrider = (control : FormControl ): ValidationErrors | null => {

  const value:string = control.value.trim().toLowerCase();

  if( value === 'strider'){
    return {
      noStrider:true
    }
  }

  return null;
}
