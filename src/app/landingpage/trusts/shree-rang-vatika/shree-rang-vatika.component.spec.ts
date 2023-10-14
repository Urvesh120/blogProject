/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShreeRangVatikaComponent } from './shree-rang-vatika.component';

describe('ShreeRangVatikaComponent', () => {
  let component: ShreeRangVatikaComponent;
  let fixture: ComponentFixture<ShreeRangVatikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShreeRangVatikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShreeRangVatikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
