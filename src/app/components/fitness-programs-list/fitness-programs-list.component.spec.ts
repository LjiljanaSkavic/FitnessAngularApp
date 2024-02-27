import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramsList } from './fitness-programs-list.component';

describe('WorkoutProgramsComponent', () => {
  let component: FitnessProgramsList;
  let fixture: ComponentFixture<FitnessProgramsList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessProgramsList]
    });
    fixture = TestBed.createComponent(FitnessProgramsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
