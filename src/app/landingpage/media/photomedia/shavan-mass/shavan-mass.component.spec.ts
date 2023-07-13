import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShavanMassComponent } from './shavan-mass.component';

describe('ShavanMassComponent', () => {
  let component: ShavanMassComponent;
  let fixture: ComponentFixture<ShavanMassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShavanMassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShavanMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
