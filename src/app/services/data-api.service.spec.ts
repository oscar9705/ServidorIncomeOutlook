import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataApiService } from './data-api.service';
import { UsuarioModel } from '../models/usuario.model';
import { IngresoModel } from '../models/ingreso.model';

describe('DataApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      DataApiService
    ]
  }));

  it('should be created', () => {
    const service: DataApiService = TestBed.get(DataApiService);
    expect(service).toBeTruthy();
  });

  it ('should get ingreso',() => {
    const service: DataApiService = TestBed.get(DataApiService);
    expect(service.getIngreso()).toBeTruthy();
  });

  it ('should loginUser',() => {
    const service: DataApiService = TestBed.get(DataApiService);
    expect(service.loginUser('german@hotmail.com','german0419')).toBeTruthy();
  });

  it ('should registroUser',() => {
    const usuario : UsuarioModel = new UsuarioModel();
    usuario.email='delgado@hotmail.com';
    usuario.password='delgado123'
    usuario.nombre='German'
    usuario.apellido='Delgado'
    usuario.telefono=3163223713
    const service: DataApiService = TestBed.get(DataApiService);
    expect(service.registrarUser(usuario)).toBeTruthy();
  });

  it ('should sendCorreo',() => {
    const service: DataApiService = TestBed.get(DataApiService);
    expect(service.sendCorreo('german-1-9@hotmail.com')).toBeTruthy();
  });

  it ('should registrarIngreso',() => {
    const service: DataApiService = TestBed.get(DataApiService);
    const ingreso : IngresoModel = new IngresoModel();
    ingreso.usuario_id=1;
    ingreso.valor=250000;
    ingreso.descripcion="Lo que me gané programando";
    const date: Date = new Date('2020-05-20');
    ingreso.fecha= date;
    expect(service.registrarIngreso(ingreso)).toBeTruthy();
  });

  it ('should updatePassword',() => {
    const service: DataApiService = TestBed.get(DataApiService);
    const usuario : UsuarioModel = new UsuarioModel();
    usuario.password='delgado123'
    expect(service.updatePassword(1,usuario)).toBeTruthy();
  });
});
