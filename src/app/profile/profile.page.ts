import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from '../user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
currentImage
ID;
userId;
name;
email;
photoUrl;
uid;

users;
used: any;

  constructor(private camera: Camera, public userService:UserService,public loadingController:LoadingController,private router:Router) { 
    this.userId = this.userService.UserInfor();
    // this.users = this.quizService.getUserInformation();
    // this.used = this.quizService.getUserInformation();
    console.log(this.users);

    // getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
       this.ID = user.uid;
       console.log(this.ID);
      } else {
        // No user is signed in.
       this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
   // this.loadData();
  }

  async loadData() {
   const loader = await this.loadingController.create({
      spinner: 'bubbles',
     message: 'loading user Information...'
    });
    await loader.present();
    this.userService.getUserInformation().then( getUserInformation => {
      this.used = getUserInformation;
      loader.dismiss();
 });
  }
  takepic(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.currentImage = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
}
}
