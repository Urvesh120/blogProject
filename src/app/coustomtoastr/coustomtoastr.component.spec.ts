import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomtoastrComponent } from './coustomtoastr.component';

describe('CoustomtoastrComponent', () => {
  let component: CoustomtoastrComponent;
  let fixture: ComponentFixture<CoustomtoastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomtoastrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomtoastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
