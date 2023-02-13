import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NandikeshwarmahadevComponent } from './nandikeshwarmahadev.component';

describe('NandikeshwarmahadevComponent', () => {
  let component: NandikeshwarmahadevComponent;
  let fixture: ComponentFixture<NandikeshwarmahadevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NandikeshwarmahadevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NandikeshwarmahadevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
