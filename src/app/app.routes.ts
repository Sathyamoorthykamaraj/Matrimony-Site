import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./swipescreen/swipescreen.page').then((m) => m.SwipescreenPage),
  },
  {
    path: 'swipescreen',
    loadComponent: () =>
      import('./swipescreen/swipescreen.page').then((m) => m.SwipescreenPage),
  },
  {
    path: 'searchswipe',
    loadComponent: () =>
      import('./searchswipe/searchswipe.page').then((m) => m.SearchswipePage),
  },
  {
    path: 'viewprofile/:id',
    loadComponent: () =>
      import('./viewprofile/viewprofile.page').then((m) => m.ViewprofilePage),
  },
];