import { Routes } from '@angular/router';
import { MainSideComponent } from './main-side/main-side.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FilmListComponent } from './film-list/film-list.component';
import { AuthGuard } from './service/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailAddressComponent } from './forgot-password/email-address/email-address.component';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'main', component: MainSideComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'forgot-password', component: EmailAddressComponent },
  { path: 'set-new-password', component: ForgotPasswordComponent },
  {
    path: 'film-list',
    component: FilmListComponent,
    canActivate: [AuthGuard]
  },
]