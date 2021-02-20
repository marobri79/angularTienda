import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialDetalleComponent } from './editorial-detalle.component';

describe('EditorialDetalleComponent', () => {
  let component: EditorialDetalleComponent;
  let fixture: ComponentFixture<EditorialDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorialDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
