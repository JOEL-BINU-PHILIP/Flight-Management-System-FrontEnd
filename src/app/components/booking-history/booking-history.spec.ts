import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryComponent } from './booking-history.component';

describe('BookingHistory', () => {
  let component: BookingHistoryComponent;
  let fixture: ComponentFixture<BookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
