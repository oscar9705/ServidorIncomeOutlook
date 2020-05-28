import { DataApiService } from './../../../services/data-api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestablecerComponent } from './restablecer.component';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModel } from 'src/app/models/usuario.model';

describe('RestablecerComponent', () => {
  let component: RestablecerComponent;
  let fixture: ComponentFixture<RestablecerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerComponent ],
      imports:[
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Comparar la fecha del link de recuperación', () => {
    const date: Date = new Date('2020-05-25');
    expect(component.compararFechas(date)).toBeFalsy();
  });
  it('Comparar la fecha del link de recuperación (fecha menor a la actual)', () => {
    const date: Date = new Date('2020-05-20');
    expect(component.compararFechas(date)).toBeNull();
  });
  it('verificar codigo', () => {
    const service: DataApiService = TestBed.get(DataApiService);
    let usuarios: UsuarioModel[] = [];
    let r: boolean;
    service.getUser().subscribe(usuario => {
      usuarios = usuario;
      const id = '1590290074FfORYXOH';
      r = component.getInformacion(usuarios, id);
      expect(r).toBeTruthy();
    });
  });
});
