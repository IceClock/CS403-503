import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterPanelComponent } from './interpreter-panel.component';

describe('InterpreterPanelComponent', () => {
  let component: InterpreterPanelComponent;
  let fixture: ComponentFixture<InterpreterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
