import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideomediaComponent } from './videomedia.component';

describe('VideomediaComponent', () => {
  let component: VideomediaComponent;
  let fixture: ComponentFixture<VideomediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideomediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
