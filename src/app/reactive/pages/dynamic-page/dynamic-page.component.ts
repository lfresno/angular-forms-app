import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  //son dinámicos porque no sabemos la cantidad de inputs o cajas que vamos a tener

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([  //un campo formado por un array
      // ['Metal Gear', Validators.required],
      // ['Zelda', Validators.required],
    ]),
  });

  public newFavorite:FormControl = new FormControl('', [Validators.required]);


  constructor(private fb: FormBuilder){ this.myForm.reset(); }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ) : boolean | null {

    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;

  }

  getFieldError( field:string ): string | null {

    //si el formulario no tiene este campo, no devuelve nada
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch(key) {
        case 'required':
          return 'Este campo es obligatorio';

          case 'minlength':
            return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  isValidFieldInArray( formArray: FormArray, i: number ) {
    return formArray.controls[i].errors
      && formArray.controls[i].touched;
  }


  onAddToFavorites() : void {
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    //si no usamos form builder se podría hacer así
    //this.favoriteGames.push( new FormControl(newGame, Validators.required));

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index:number ) : void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
