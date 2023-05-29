import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandirSambandhitComponent } from './mandir-sambandhit.component';

describe('MandirSambandhitComponent', () => {
  let component: MandirSambandhitComponent;
  let fixture: ComponentFixture<MandirSambandhitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandirSambandhitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandirSambandhitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
