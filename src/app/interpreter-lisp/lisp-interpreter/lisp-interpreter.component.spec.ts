import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LispInterpreterComponent } from './lisp-interpreter.component';

describe('LispInterpreterComponent', () => {
  let component: LispInterpreterComponent;
  let fixture: ComponentFixture<LispInterpreterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LispInterpreterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LispInterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
