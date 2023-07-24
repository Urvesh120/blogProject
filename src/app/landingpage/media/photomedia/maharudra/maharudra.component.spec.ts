import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaharudraComponent } from './maharudra.component';

describe('MaharudraComponent', () => {
  let component: MaharudraComponent;
  let fixture: ComponentFixture<MaharudraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaharudraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaharudraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
