import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SundarKandComponent } from './sundar-kand.component';

describe('SundarKandComponent', () => {
  let component: SundarKandComponent;
  let fixture: ComponentFixture<SundarKandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SundarKandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SundarKandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
