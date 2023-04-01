import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NandikeshwarcharitableComponent } from './nandikeshwarcharitable.component';

describe('NandikeshwarcharitableComponent', () => {
  let component: NandikeshwarcharitableComponent;
  let fixture: ComponentFixture<NandikeshwarcharitableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NandikeshwarcharitableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NandikeshwarcharitableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
