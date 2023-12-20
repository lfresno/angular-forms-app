import { EmailValidator } from './../../../shared/validators/email-validator.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    // name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]], //Validators.email sólo comprueba que tenga un @. Queremos que haga más cosas

    //hacemos lo mismo pero con el servicio
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    //email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required]  //campo de repetir la contraseña
  }, {
    validators: [ //lo que ponga aquí pasa como argumento implícito a todo el formulario. Se hace a nivel de formGroup
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });



  constructor(
    private fb : FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
    ) {}

  isValidField( field:string ) {
    // obtener validación desde un servicio
    //delegamos la funcionalidad al servicio
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() : void {

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

  }

}
