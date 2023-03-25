import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotomediaTwoComponent } from './photomedia-two.component';

describe('PhotomediaTwoComponent', () => {
  let component: PhotomediaTwoComponent;
  let fixture: ComponentFixture<PhotomediaTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotomediaTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotomediaTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
