import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
//database =firebase.database()
var firebaseConfig = {
  apiKey: "AIzaSyAYod_9t3GpCFJBAXEVPJFRkV8eFkDMJNg",
  authDomain: "quizzapp-aeef4.firebaseapp.com",
  databaseURL: "https://quizzapp-aeef4.firebaseio.com",
  projectId: "quizzapp-aeef4",
  storageBucket: "",
  messagingSenderId: "754117199011",
  appId: "1:754117199011:web:32aa02e8c65d8a4d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
