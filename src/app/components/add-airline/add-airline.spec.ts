import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirline } from './add-airline';

describe('AddAirline', () => {
  let component: AddAirline;
  let fixture: ComponentFixture<AddAirline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAirline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAirline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
