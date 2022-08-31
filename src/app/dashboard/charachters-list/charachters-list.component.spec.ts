import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharachtersListComponent } from './charachters-list.component';

describe('CharachtersListComponent', () => {
  let component: CharachtersListComponent;
  let fixture: ComponentFixture<CharachtersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharachtersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharachtersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
