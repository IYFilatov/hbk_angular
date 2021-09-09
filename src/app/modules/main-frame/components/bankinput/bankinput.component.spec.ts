import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankinputComponent } from './bankinput.component';

describe('BankinputComponent', () => {
  let component: BankinputComponent;
  let fixture: ComponentFixture<BankinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
