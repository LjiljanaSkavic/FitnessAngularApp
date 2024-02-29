import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramPreviewCardComponent } from './fitness-program-preview-card.component';

describe('FitnessProgramComponent', () => {
  let component: FitnessProgramPreviewCardComponent;
  let fixture: ComponentFixture<FitnessProgramPreviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessProgramPreviewCardComponent]
    });
    fixture = TestBed.createComponent(FitnessProgramPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
