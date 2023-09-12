import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahashivratriComponent } from './mahashivratri.component';

describe('MahashivratriComponent', () => {
  let component: MahashivratriComponent;
  let fixture: ComponentFixture<MahashivratriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MahashivratriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MahashivratriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
