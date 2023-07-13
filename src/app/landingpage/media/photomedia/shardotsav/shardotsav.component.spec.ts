import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardotsavComponent } from './shardotsav.component';

describe('ShardotsavComponent', () => {
  let component: ShardotsavComponent;
  let fixture: ComponentFixture<ShardotsavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShardotsavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShardotsavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
