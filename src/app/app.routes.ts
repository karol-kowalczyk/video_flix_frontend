import { Routes } from '@angular/router';
import { MainSideComponent } from './main-side/main-side.component';

export const routes: Routes = [
    { path:'', redirectTo: 'main', pathMatch: 'full' },
    { path:'main', component: MainSideComponent}
];
