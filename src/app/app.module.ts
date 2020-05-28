
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './Material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrarComponent } from './Components/user/registrar/registrar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from './services/data-api.service';
import { RestablecerComponent } from './components/user/restablecer/restablecer.component';
import { CorreoComponent } from './components/user/correo/correo.component';
import { RegistrarIngresoComponent } from './components/ingresos/registrar-ingreso/registrar-ingreso.component';


const routes: Routes = [

  { path: 'Login', component: LoginComponent},
  { path: 'Registrar', component: RegistrarComponent},
  { path: 'Home', component: HomeComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'Login' }

];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarComponent,
    RestablecerComponent,
    CorreoComponent,
    RegistrarIngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
