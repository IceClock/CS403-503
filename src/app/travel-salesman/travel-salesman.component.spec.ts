import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSalesmanComponent } from './travel-salesman.component';

describe('TravelSalesmanComponent', () => {
  let component: TravelSalesmanComponent;
  let fixture: ComponentFixture<TravelSalesmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelSalesmanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
