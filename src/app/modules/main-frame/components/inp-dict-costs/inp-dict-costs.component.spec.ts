import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictCostsComponent } from './inp-dict-costs.component';

describe('InpDictCostsComponent', () => {
  let component: InpDictCostsComponent;
  let fixture: ComponentFixture<InpDictCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
