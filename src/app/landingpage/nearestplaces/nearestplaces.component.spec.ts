import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestplacesComponent } from './nearestplaces.component';

describe('NearestplacesComponent', () => {
  let component: NearestplacesComponent;
  let fixture: ComponentFixture<NearestplacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearestplacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
