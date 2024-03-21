import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivityLogCardComponent } from './ativity-log-card.component';

describe('AtivityLogCardComponent', () => {
  let component: AtivityLogCardComponent;
  let fixture: ComponentFixture<AtivityLogCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivityLogCardComponent]
    });
    fixture = TestBed.createComponent(AtivityLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
