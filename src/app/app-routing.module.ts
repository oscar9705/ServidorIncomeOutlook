import { CorreoComponent } from './components/user/correo/correo.component';
import { RestablecerComponent } from './components/user/restablecer/restablecer.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { RegistrarComponent } from './Components/user/registrar/registrar.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrarIngresoComponent } from './components/ingresos/registrar-ingreso/registrar-ingreso.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'user/registrar', component: RegistrarComponent },
  {path: 'user/login', component: LoginComponent },
  {path: 'user/restablecer/:id', component: RestablecerComponent},
  {path: 'recuperar', component: CorreoComponent},
  {path: 'home', component: HomeComponent },
  {path: 'user/ingreso', component: RegistrarIngresoComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
