import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HusbandComponent } from './husband.component';

describe('HusbandComponent', () => {
  let component: HusbandComponent;
  let fixture: ComponentFixture<HusbandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HusbandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HusbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
