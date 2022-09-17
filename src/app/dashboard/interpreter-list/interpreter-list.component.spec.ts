import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterListComponent } from './interpreter-list.component';

describe('InterpreterListComponent', () => {
  let component: InterpreterListComponent;
  let fixture: ComponentFixture<InterpreterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
