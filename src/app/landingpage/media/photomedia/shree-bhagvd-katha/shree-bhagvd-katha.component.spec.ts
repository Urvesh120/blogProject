import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShreeBhagvdKathaComponent } from './shree-bhagvd-katha.component';

describe('ShreeBhagvdKathaComponent', () => {
  let component: ShreeBhagvdKathaComponent;
  let fixture: ComponentFixture<ShreeBhagvdKathaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShreeBhagvdKathaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShreeBhagvdKathaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
