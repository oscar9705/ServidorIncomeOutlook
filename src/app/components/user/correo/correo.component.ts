import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  correo: string;
  res: boolean;
  formulario: FormGroup = new FormGroup({});
  usuario: UsuarioModel[] = [];
  constructor(public fb: FormBuilder, private dataApi: DataApiService, private router: Router) {
    this.formulario = this.fb.group({
      email: ['', [ Validators.required, Validators.email]]
    });
  }
  get f() {
    return this.formulario.controls;
  }
  onSubmit() {
    console.warn(this.formulario.value.email);
    this.correo = this.formulario.value.email;
    let re = false;
    this.dataApi.getUser().subscribe(usuarios => {
      this.usuario = usuarios;
      console.log(this.usuario);
      console.log(this.usuario[0].codigo);
      console.log(this.usuario.length);
      for ( let counter = 0; counter < this.usuario.length; counter++) {
        console.log('for loop executed : ' + counter);
        if (this.usuario[counter].email ===  this.formulario.value.email ) {
          re = true;
          this.res = true;
          break;
        } else {
           this.res = false;
        }
    }
      if (!re) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Este correo no se encuentra registrado',
        footer: 'Verifique el correo ingresado',
        });
      this.router.navigate(['recuperar']);
    }
      if (re) {
      this.dataApi.sendCorreo(this.correo).subscribe();
      Swal.fire(
      '¡Exito!',
      'Revise su correo para seguir las instrucciones de la recuperación de contraseña',
      'success'
    );
      this.router.navigate(['Login']);
    }
    }, (err) => {
      console.log(err);
      Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: err.error.error.message,
          footer: 'Vuelve a intentarlo'
         });
    });
  }

  ngOnInit() {
  }

}
