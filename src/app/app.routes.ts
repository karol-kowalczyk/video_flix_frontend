import { Routes } from '@angular/router';
import { MainSideComponent } from './main-side/main-side.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';




export const routes: Routes = [
    { path:'', redirectTo: 'main', pathMatch: 'full' },
    { path:'main', component: MainSideComponent},
    { path:'register', component: RegisterComponent},
    { path:'login', component: LoginComponent},
    { path:'content', component: ContentComponent},
    { path:'imprint', component: ImprintComponent},
    { path:'privacy-policy', component: PrivacyPolicyComponent},
];
