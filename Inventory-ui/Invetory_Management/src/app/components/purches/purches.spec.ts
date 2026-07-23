import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purches } from './purches';

describe('Purches', () => {
  let component: Purches;
  let fixture: ComponentFixture<Purches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Purches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
