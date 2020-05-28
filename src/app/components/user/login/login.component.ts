import { Router } from '@angular/router';
import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormControl,FormGroupDirective, NgForm, Validators,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsuarioModel } from '../../../models/usuario.model'
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  constructor(private datapi: DataApiService, private router :Router) { }

  hide:boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {

    $(document).ready(function(){
      $('.login-info-box').fadeOut();
      $('.login-show').addClass('show-log-panel');
  });
    $('.login-reg-panel input[type="radio"]').on('change', function() {
      if($('#log-login-show').is(':checked')) {
          $('.register-info-box').fadeOut(); 
          $('.login-info-box').fadeIn();
          $('.white-panel').addClass('right-log');
          $('.register-show').addClass('show-log-panel');
          $('.login-show').removeClass('show-log-panel');
        }
      else if($('#log-reg-show').is(':checked')) {
          $('.register-info-box').fadeIn();
          $('.login-info-box').fadeOut();
          $('.white-panel').removeClass('right-log');
          $('.login-show').addClass('show-log-panel');
          $('.register-show').removeClass('show-log-panel');
      }
  });
  }

  loginUser(form: NgForm){
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }
    
    this.datapi.loginUser(this.usuario.email,this.usuario.password).subscribe( resp => {
      console.log(resp);
      Swal.fire(
        '¡Exito!',
        'Usuario inicio sesion correctamente',
        'success'
      );
    this.router.navigate(['user/ingreso']);
    }, (err)=>{
      console.log(this.usuario.password);
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Algo ha salido mal',
        text: err.error.error.message,
        footer: 'Vuelve a intentarlo'
      })

    });
  }

  onHide(){ 
    if(!this.emailFormControl.hasError('required')
       && !this.emailFormControl.hasError('email') 
       && !this.passwordFormControl.hasError('required')
       && !this.passwordFormControl.hasError('minLength')
       ){
      return false;
    }
    else{
      return true;
    }
  }

}
