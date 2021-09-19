import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCloseButtonsComponent } from './doc-close-buttons.component';

describe('DocCloseButtonsComponent', () => {
  let component: DocCloseButtonsComponent;
  let fixture: ComponentFixture<DocCloseButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocCloseButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCloseButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
