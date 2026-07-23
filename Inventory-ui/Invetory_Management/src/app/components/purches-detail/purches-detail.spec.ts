import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesDetail } from './purches-detail';

describe('PurchesDetail', () => {
  let component: PurchesDetail;
  let fixture: ComponentFixture<PurchesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchesDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchesDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
