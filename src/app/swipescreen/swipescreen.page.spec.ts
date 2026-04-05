import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwipescreenPage } from './swipescreen.page';

describe('SwipescreenPage', () => {
  let component: SwipescreenPage;
  let fixture: ComponentFixture<SwipescreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipescreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
