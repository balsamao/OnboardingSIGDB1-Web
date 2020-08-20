import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaErroComponent } from './alerta-erro.component';

describe('AlertaErroComponent', () => {
  let component: AlertaErroComponent;
  let fixture: ComponentFixture<AlertaErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
