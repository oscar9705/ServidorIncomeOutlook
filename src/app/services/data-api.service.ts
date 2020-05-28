import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
 };

@Injectable({
  providedIn: 'root'
})

export class DataApiService {
   url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getUser(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.url}/usuarios/todos`);
   }

   registrarUser(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios/add`, usuario, httpOptions);
   }

   loginUser(email, pass){
    return this.http.post(`${this.url}/usuario/login`,{"email": email, "password": pass}, httpOptions);
   }
   sendCorreo(correo: string) {
     return this.http.get(`http://localhost/EnvioCorreo/Prueba.php?correo=${correo}`);
   }
   registrarIngreso(ingreso: Object) {
    return this.http.post(`${this.url}/ingresos/add`, ingreso, httpOptions);
   }

   getCategoria(id) {
    return this.http.get(`${this.url}/usuarios/${id}/categorias`);
   }

   getIngreso() {
    return this.http.get(`${this.url}/usuarios/todos`);
   }
   updatePassword(id: number, user: UsuarioModel) {
     const password = user.password;
     return this.http.patch(`${this.url}/usuarios/${id}`, {password} , httpOptions);
   }
}

