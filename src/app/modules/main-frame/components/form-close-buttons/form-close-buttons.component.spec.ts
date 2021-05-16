import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCloseButtonsComponent } from './form-close-buttons.component';

describe('FormCloseButtonsComponent', () => {
  let component: FormCloseButtonsComponent;
  let fixture: ComponentFixture<FormCloseButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCloseButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCloseButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
