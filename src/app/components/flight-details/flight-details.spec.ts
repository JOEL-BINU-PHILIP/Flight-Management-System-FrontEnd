import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetails } from './flight-details.component';

describe('FlightDetails', () => {
  let component: FlightDetails;
  let fixture: ComponentFixture<FlightDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
