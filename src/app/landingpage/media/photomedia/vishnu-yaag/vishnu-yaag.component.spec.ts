import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VishnuYaagComponent } from './vishnu-yaag.component';

describe('VishnuYaagComponent', () => {
  let component: VishnuYaagComponent;
  let fixture: ComponentFixture<VishnuYaagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VishnuYaagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VishnuYaagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
