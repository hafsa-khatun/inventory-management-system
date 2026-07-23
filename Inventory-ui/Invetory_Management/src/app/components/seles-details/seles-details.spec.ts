import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelesDetails } from './seles-details';

describe('SelesDetails', () => {
  let component: SelesDetails;
  let fixture: ComponentFixture<SelesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelesDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
