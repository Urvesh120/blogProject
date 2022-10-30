import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustsComponent } from './trusts.component';

describe('TrustsComponent', () => {
  let component: TrustsComponent;
  let fixture: ComponentFixture<TrustsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
