import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import{Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email
password
  constructor(public userService:UserService, public alert: AlertController, public alertController: AlertController,
    public toastController: ToastController,
    public router:Router) {} 

  ngOnInit() {
  }
login(){
  this.userService.signin(this.email, this.password).then((result)=>{
    console.log(result);
    if(result.operationType == "signIn"){
      this.router.navigate(['/category'])
      this.presentToast();
    }else{
      this.presentAlert(result);
    }
   });
  }
  async presentAlert(result){
    const alert = await this.alertController.create({
      header:'Alert',
      message:result,
      buttons:['OK']
    });
    await alert.present();
  }


 async presentToast() {
    const toast= await this.toastController.create({
      message:'login successfully....',
      duration:8000,
      color:"primary",
      position:"middle"
    });
    toast.present();
  }
async resertPassword(){
  const alert = await this.alert.create({
    header: 'Prompt!',
    inputs: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'enter email'
      }],
   
      buttons: [
        {
          text: 'send',
         handler: (email) => {
          console.log(email.email)
           this.userService.resetepassword(email.email)
          ;}
          }, {
            text:"cancel",
            handler:()=>{
              
            }
          }]
});
await alert.present();
}

}