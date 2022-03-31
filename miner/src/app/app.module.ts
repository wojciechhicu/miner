import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { FirebaseService } from './services/firebase.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ELoginCompHanderComponent } from './handlers/e-login-comp-hander/e-login-comp-hander.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { DevicesComponent } from './components/dashboard/devices/devices.component';
import { ConfigurationsComponent } from './components/dashboard/configurations/configurations.component';
import { LabelsComponent } from './components/dashboard/labels/labels.component';
import { WorkersComponent } from './components/dashboard/workers/workers.component';
import { AccauntsComponent } from './components/dashboard/accaunts/accaunts.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { WalletsComponent } from './components/dashboard/wallets/wallets.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ELoginCompHanderComponent,
    NavigationComponent,
    DevicesComponent,
    ConfigurationsComponent,
    LabelsComponent,
    WorkersComponent,
    AccauntsComponent,
    TransactionsComponent,
    WalletsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
