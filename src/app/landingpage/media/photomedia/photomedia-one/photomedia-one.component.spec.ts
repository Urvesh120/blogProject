import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotomediaOneComponent } from './photomedia-one.component';

describe('PhotomediaOneComponent', () => {
  let component: PhotomediaOneComponent;
  let fixture: ComponentFixture<PhotomediaOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotomediaOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotomediaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
