import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchswipePage } from './searchswipe.page';

describe('SearchswipePage', () => {
  let component: SearchswipePage;
  let fixture: ComponentFixture<SearchswipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchswipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
