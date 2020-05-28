import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsuarioModel } from '../../../models/usuario.model';
import Swal from 'sweetalert2';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private datapi: DataApiService) {
    this.getUsuarios();
   }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  nombreFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
  ]);
  apellidoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
  ]);
  telefonoFormControl = new FormControl('', [
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  matcher = new MyErrorStateMatcher();

  getUsuarios()  {
    this.datapi.getUser().subscribe(usuarios => console.log(usuarios));
  }
  ngOnInit() {
  }
  onSave() {
    console.log('guardado');
  }

  registrarUser(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    this.datapi.registrarUser(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.fire(
        '¡Exito!',
        'Usuario creado correctamente',
        'success'
      );
    }, (err) => {
     const texError = 'Hay un problema con  ' + err.error.error.details[0].path;
     Swal.fire({
        icon: 'error',
        title: 'Algo ha salido mal',
        text: texError,
        footer: 'Vuelve a intentarlo'
      });

    });
  }

onHide() {
    if (!this.emailFormControl.hasError('required')
      && !this.emailFormControl.hasError('email')
      && !this.passwordFormControl.hasError('required')
      && !this.passwordFormControl.hasError('minLength')
      && !this.nombreFormControl.hasError('required')
      && !this.nombreFormControl.hasError('pattern')
      && !this.apellidoFormControl.hasError('required')
      && !this.apellidoFormControl.hasError('pattern')
      ) {
      return false;
    } else {
      return true;
        }
  }
}
