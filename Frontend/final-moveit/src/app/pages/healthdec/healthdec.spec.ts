import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Healthdec } from './healthdec';

describe('Healthdec', () => {
  let component: Healthdec;
  let fixture: ComponentFixture<Healthdec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Healthdec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Healthdec);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
