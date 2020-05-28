import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {confirmedValidator} from '../../../validators/password.validators';
import { DataApiService } from './../../../services/data-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UsuarioModel } from '../../../models/usuario.model';
import Swal from 'sweetalert2';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  cod: string;
  res: boolean;
  usuario: UsuarioModel[] = [];
  user: UsuarioModel = new UsuarioModel();
  constructor(public fb: FormBuilder, private datapi: DataApiService, private route: ActivatedRoute, private router: Router) {
    this.res = false;
    this.getUsuario();
    this.cod = this.route.snapshot.paramMap.get('id');
    this.formulario = this.fb.group({
    password: ['', [ Validators.required, Validators.minLength(8)]],
    passwordCon: ['', [ Validators.required]]
  },  {
    validator: confirmedValidator('password', 'passwordCon')
  });
}
  get f() {
    return this.formulario.controls;
  }
  getInformacion(usuario: UsuarioModel[], code: string): boolean {
    let r: boolean;
    for ( let counter = 0; counter < this.usuario.length; counter++) {
      if (this.usuario[counter].codigo ===  code ) {
        this.user.id = usuario[counter].id;
        this.user.email = usuario[counter].email;
        this.user.nombre = usuario[counter].nombre;
        this.user.apellido = usuario[counter].apellido;
        this.user.active = usuario[counter].active;
        this.user.telefono = usuario[counter].telefono;
        this.user.codigo  = usuario[counter].codigo;
        this.user.fechaRecuperacion = usuario[counter].fechaRecuperacion;
        const dateE: Date = new Date(this.user.fechaRecuperacion);
        r = true;
        break;
      } else {
         r = false;
      }
  }
    return r;
  }
  getUsuario() {
    let re = false;
    this.datapi.getUser().subscribe(usuarios => {
      this.usuario = usuarios;
      const date: Date = new Date();
      console.log("THIS.COD: " + this.cod);
      re = this.getInformacion(this.usuario, this.cod);
      console.log(this.getInformacion(this.usuario, this.cod));
      if (!re) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'este link no es válido ',
        });
      this.router.navigate(['home']);
    }
    console.log("FECHA: "+this.user.fechaRecuperacion);
    //  this.compararFechas();
    console.log(this.compararFechas(this.user.fechaRecuperacion));
      if (this.compararFechas(this.user.fechaRecuperacion)) {
        Swal.fire({
          icon: 'error',
          title: 'Codigo invalido',
          text: 'el  link expiró solo tenía vigencia por 24 horas',
          footer: 'solicite un nuevo link'
         });
        this.router.navigate(['recuperar']);
      } else if (this.compararFechas(this.user.fechaRecuperacion) === null) {
        Swal.fire({
          icon: 'error',
          title: 'Codigo invalido',
          text: 'el  link expiró solo tenía vigencia por 24 horas',
          footer: 'solicite un nuevo link'
         });
        this.router.navigate(['recuperar']);
      }
    }, (err) => {
      Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: err.error.error.message,
          footer: 'Vuelve a intentarlo'
         });
    } );
  }
  onSubmit() {
    this.user.password = this.formulario.value.password;
    this.datapi.updatePassword(this.user.id, this.user).subscribe(() => {
      Swal.fire(
        '¡Exito!',
        'Contraseña actualizada',
        'success'
      );
    }, error => {
    Swal.fire({
      icon: 'error',
      title: 'Algo ha salido mal',
      text: error.error.error.message,
      footer: 'Vuelve a intentarlo'
     });
    });

  }
  compararFechas(fecha: Date): boolean {
    const dateA: Date = new Date(fecha);
    console.log("dateAUTC: "+dateA.getUTCDate());
    console.log("dateA: "+dateA.getDate());
    const dataAct: Date = new Date();
    console.log("dataUTCAct: "+dataAct.getUTCDate());
    console.log("dataAct: "+dataAct.getDate());
    if (dateA.getUTCDate() > (dataAct.getUTCDate() + 1) ) {
      return true;
    } else if (dateA.getUTCDate() > dataAct.getUTCDate()) {
      return false;

    // tslint:disable-next-line:align
    }
    return null;
  }

ngOnInit() {
  this.getUsuario();
  }

}
