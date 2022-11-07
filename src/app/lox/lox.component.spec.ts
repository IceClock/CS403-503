import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoxComponent } from './lox.component';

describe('LoxComponent', () => {
  let component: LoxComponent;
  let fixture: ComponentFixture<LoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
