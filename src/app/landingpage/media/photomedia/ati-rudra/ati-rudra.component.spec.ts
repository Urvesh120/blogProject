import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtiRudraComponent } from './ati-rudra.component';

describe('AtiRudraComponent', () => {
  let component: AtiRudraComponent;
  let fixture: ComponentFixture<AtiRudraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtiRudraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtiRudraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
