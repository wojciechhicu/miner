import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DevicesComponent } from './components/dashboard/devices/devices.component';
import { ConfigurationsComponent } from './components/dashboard/configurations/configurations.component';
import { LabelsComponent } from './components/dashboard/labels/labels.component';
import { WorkersComponent } from './components/dashboard/workers/workers.component';
import { AccauntsComponent } from './components/dashboard/accaunts/accaunts.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { WalletsComponent } from './components/dashboard/wallets/wallets.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';

import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        canActivate: [AuthGuard],
        path: 'devices',
        component: DevicesComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'configurations',
        component: ConfigurationsComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'labels',
        component: LabelsComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'workers',
        component: WorkersComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'accaunts',
        component: AccauntsComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'transactions',
        component: TransactionsComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'wallets',
        component: WalletsComponent,
        outlet: 'content'
      },
      {
        canActivate: [AuthGuard],
        path: 'settings',
        component: SettingsComponent,
        outlet: 'content'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
