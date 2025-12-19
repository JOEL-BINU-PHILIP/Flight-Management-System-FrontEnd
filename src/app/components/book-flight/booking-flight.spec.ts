import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFlight } from './booking-flight';

describe('BookingFlight', () => {
  let component: BookingFlight;
  let fixture: ComponentFixture<BookingFlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFlight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
