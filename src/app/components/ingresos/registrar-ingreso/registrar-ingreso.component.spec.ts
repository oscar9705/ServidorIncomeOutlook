import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarIngresoComponent } from './registrar-ingreso.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrarIngresoComponent', () => {
  let component: RegistrarIngresoComponent;
  let fixture: ComponentFixture<RegistrarIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarIngresoComponent ],
      imports: [
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
    fixture = TestBed.createComponent(RegistrarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
