import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousCharacterPanelComponent } from './famous-character-panel.component';

describe('FamousCharacterPanelComponent', () => {
  let component: FamousCharacterPanelComponent;
  let fixture: ComponentFixture<FamousCharacterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamousCharacterPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousCharacterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
