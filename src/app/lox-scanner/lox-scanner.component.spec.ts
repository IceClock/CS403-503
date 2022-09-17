import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoxScannerComponent } from './lox-scanner.component';

describe('LoxScannerComponent', () => {
  let component: LoxScannerComponent;
  let fixture: ComponentFixture<LoxScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoxScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoxScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
