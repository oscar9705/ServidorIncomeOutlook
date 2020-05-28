import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import Swal from 'sweetalert2';
import { IngresoModel } from 'src/app/models/ingreso.model';

interface Categoria{
  id : number;
  nombre : string;
  id_usuario : number;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrar-ingreso',
  templateUrl: './registrar-ingreso.component.html',
  styleUrls: ['./registrar-ingreso.component.css']
})
export class RegistrarIngresoComponent implements OnInit {
  ingreso : IngresoModel = new IngresoModel();

  constructor(private datapi: DataApiService) {
    this.getCategorias();
   }


   categorias: Categoria[] = [];

  getCategorias(){
    return this.datapi.getCategoria(1).subscribe(cats => {
     for(let i = 0; i<=cats.isPrototypeOf.length;i++){
         this.categorias.push(cats[i]);
     }   
    },(err)=>{
      console.log(err);
    });
  }



  ngOnInit() {
  }

  valorFormControl = new FormControl('', [
    Validators.required,
  ]);
  descripcionFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  matcher = new MyErrorStateMatcher();

  registrarIngreso(form: NgForm){
    console.log(form);
    console.log(this.ingreso);
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }

    this.datapi.registrarIngreso(this.ingreso).subscribe( resp => {
      console.log(resp);
      Swal.fire({
        position: 'top-end',
        title: 'Ingreso registrado',
        showConfirmButton: false,
        timer: 1000
      });
    }, (err) => {
      var texError = "Hay un problema con "+err.error.error.details[0].path;
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Algo ha salido mal',
        text: texError,
        footer: 'Vuelve a intentarlo'
      })

    });
  }


  onHide()
  {
    if (!this.valorFormControl.hasError('required')
      && !this.descripcionFormControl.hasError('required')
      && !this.descripcionFormControl.hasError('minLength')
      ){
      return false;
    }
    else
        {
      return true;
        }
  }

}
