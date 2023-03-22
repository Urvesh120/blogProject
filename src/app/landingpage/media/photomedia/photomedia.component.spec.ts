import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotomediaComponent } from './photomedia.component';

describe('PhotomediaComponent', () => {
  let component: PhotomediaComponent;
  let fixture: ComponentFixture<PhotomediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotomediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotomediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
