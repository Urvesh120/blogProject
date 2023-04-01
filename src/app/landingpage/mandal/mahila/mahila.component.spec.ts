import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahilaComponent } from './mahila.component';

describe('MahilaComponent', () => {
  let component: MahilaComponent;
  let fixture: ComponentFixture<MahilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MahilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MahilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
