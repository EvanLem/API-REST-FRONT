import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTableauComponent } from './reservation-tableau.component';

describe('ReservationTableauComponent', () => {
  let component: ReservationTableauComponent;
  let fixture: ComponentFixture<ReservationTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationTableauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
