import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramDetailsComponent } from './fitness-program-details.component';

describe('FitnessProgramDetailsComponent', () => {
  let component: FitnessProgramDetailsComponent;
  let fixture: ComponentFixture<FitnessProgramDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessProgramDetailsComponent]
    });
    fixture = TestBed.createComponent(FitnessProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
