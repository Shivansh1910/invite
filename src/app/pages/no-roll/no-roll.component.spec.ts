import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRollComponent } from './no-roll.component';

describe('NoRollComponent', () => {
  let component: NoRollComponent;
  let fixture: ComponentFixture<NoRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
