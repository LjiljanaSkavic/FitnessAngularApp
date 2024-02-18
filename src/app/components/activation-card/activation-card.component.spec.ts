import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationCardComponent } from './activation-card.component';

describe('ActivationCardComponent', () => {
  let component: ActivationCardComponent;
  let fixture: ComponentFixture<ActivationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationCardComponent]
    });
    fixture = TestBed.createComponent(ActivationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
