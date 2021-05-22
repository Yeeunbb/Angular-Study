import { NgModule } from '@angular/core';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoverComponent } from './cover/cover.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AuthService } from "./shared/auth.service";

import { AddTankComponent } from './add-tank/add-tank.component';
import { TankDetailsComponent } from './tank-details/tank-details.component';
import { TankListComponent } from './tank-list/tank-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'join', component: JoinComponent},
  { path: 'main', component: MainComponent},
  { path: 'info/:tank/:species/:id', component: InfoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    HomeComponent,
    LoginComponent,
    JoinComponent,
    MainComponent,
    InfoComponent,
    AddTankComponent,
    TankDetailsComponent,
    TankListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '727575319009-ad3sg369or1o7qvb0caaedisbb29tb6g.apps.googleusercontent.com'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    },LoginComponent, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
