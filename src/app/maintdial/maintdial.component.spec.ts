import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintdialComponent } from './maintdial.component';

describe('MaintdialComponent', () => {
  let component: MaintdialComponent;
  let fixture: ComponentFixture<MaintdialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintdialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintdialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
