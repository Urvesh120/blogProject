import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShravaniparvComponent } from './shravaniparv.component';

describe('ShravaniparvComponent', () => {
  let component: ShravaniparvComponent;
  let fixture: ComponentFixture<ShravaniparvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShravaniparvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShravaniparvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
