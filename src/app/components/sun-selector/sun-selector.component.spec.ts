import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunSelectorComponent } from './sun-selector.component';

describe('SunSelectorComponent', () => {
  let component: SunSelectorComponent;
  let fixture: ComponentFixture<SunSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SunSelectorComponent]
    });
    fixture = TestBed.createComponent(SunSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
