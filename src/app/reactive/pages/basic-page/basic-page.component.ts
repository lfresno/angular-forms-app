import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  // public myForm: FormGroup = new FormGroup({
    //FormControl( valorDefault, validaciones Síncronas, validaciones Asíncronas)
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  //OTRA FORMA DE HACERLO: usando Form Builder
  public myForm:FormGroup = this.fb.group({
    //nombre propiedad: [valor Default, valoraciones Síncronas, valoraciones Asíncronas]
    //todas las validaciones se tienen que cumplir para que el formulario sea aceptado como correcto y se envíe
    name: ['', [Validators.required, Validators.minLength(3)]], //por lo menos tres letras
    price: [0, [Validators.required, Validators.min(0)]], //no puede ser negativo
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.myForm.reset();
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
      console.log(key);

      switch(key) {
        case 'required':
          return 'Este campo es obligatorio';

          case 'minlength':
            return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  onSave() : void {

    //Si no es válido (no se cumplen los validators), no se guarda
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched(); //si se intenta guardar habiendo errores, saltan los mensajes de error
      return;
    }

    console.log(this.myForm.value);

    //vuelve a su valor inicial (tmbn en cuanto al pristine y al touched)
    //se puede escpecificar cualquier valor deseado para el formulario
    this.myForm.reset();
  }
}
