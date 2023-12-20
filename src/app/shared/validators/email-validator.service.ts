import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';


//es un servicio y un validador al mismo tiempo

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  constructor() { }

  //validate( formControl o formArray) : una promesa u observable que devuelve validation errors o nulo
  // validate(control: AbstractControl ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({email});

  //   return of({
  //     emailTaken:true
  //   }).pipe(
  //     //delay(2000) //para depurar
  //   );
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    //se crea una funcion observable con un subscribe
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({ email });

      if(email === 'fresno@gmail.com') {  //si el email es igual a uno que ya existe, entonces se manda el error
        subscriber.next({emailTaken: true});
        subscriber.complete();  //termina la emisión y se desuscribe
        //return; //no haría falta porque al hacer el complete ya no se siguen emitiendo más valores
      }

      subscriber.next(null);  //si el email no está pillado, no se manda ningún error
      subscriber.complete();
    }).pipe(
      delay(3000) //debug
    );

    return httpCallObservable;

  }

}
