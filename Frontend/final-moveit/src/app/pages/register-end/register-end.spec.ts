import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnd } from './register-end';

describe('RegisterEnd', () => {
  let component: RegisterEnd;
  let fixture: ComponentFixture<RegisterEnd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEnd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEnd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
