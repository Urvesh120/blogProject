import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiomediaComponent } from './audiomedia.component';

describe('AudiomediaComponent', () => {
  let component: AudiomediaComponent;
  let fixture: ComponentFixture<AudiomediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiomediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiomediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
