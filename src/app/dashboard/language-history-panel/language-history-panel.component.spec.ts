import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageHistoryPanelComponent } from './language-history-panel.component';

describe('LanguageHistoryPanelComponent', () => {
  let component: LanguageHistoryPanelComponent;
  let fixture: ComponentFixture<LanguageHistoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageHistoryPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageHistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
