import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonderapragatiComponent } from './nonderapragati.component';

describe('NonderapragatiComponent', () => {
  let component: NonderapragatiComponent;
  let fixture: ComponentFixture<NonderapragatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonderapragatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonderapragatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
