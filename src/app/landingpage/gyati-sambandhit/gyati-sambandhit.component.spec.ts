import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyatiSambandhitComponent } from './gyati-sambandhit.component';

describe('GyatiSambandhitComponent', () => {
  let component: GyatiSambandhitComponent;
  let fixture: ComponentFixture<GyatiSambandhitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GyatiSambandhitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GyatiSambandhitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
