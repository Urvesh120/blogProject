import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatChandiComponent } from './shat-chandi.component';

describe('ShatChandiComponent', () => {
  let component: ShatChandiComponent;
  let fixture: ComponentFixture<ShatChandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShatChandiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShatChandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
