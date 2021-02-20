import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDetalleComponent } from './autor-detalle.component';

describe('AutorDetalleComponent', () => {
  let component: AutorDetalleComponent;
  let fixture: ComponentFixture<AutorDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
