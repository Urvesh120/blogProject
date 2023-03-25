import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotomediaThreeComponent } from './photomedia-three.component';

describe('PhotomediaThreeComponent', () => {
  let component: PhotomediaThreeComponent;
  let fixture: ComponentFixture<PhotomediaThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotomediaThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotomediaThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
