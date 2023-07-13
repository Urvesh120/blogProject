import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DattYaagComponent } from './datt-yaag.component';

describe('DattYaagComponent', () => {
  let component: DattYaagComponent;
  let fixture: ComponentFixture<DattYaagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DattYaagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DattYaagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
