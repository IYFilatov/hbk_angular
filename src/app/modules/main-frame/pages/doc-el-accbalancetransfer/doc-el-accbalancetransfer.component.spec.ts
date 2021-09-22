import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocElAccbalancetransferComponent } from './doc-el-accbalancetransfer.component';

describe('DocElAccbalancetransferComponent', () => {
  let component: DocElAccbalancetransferComponent;
  let fixture: ComponentFixture<DocElAccbalancetransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocElAccbalancetransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocElAccbalancetransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
