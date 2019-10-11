import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase'
@Component({
  selector: 'app-quizzical',
  templateUrl: './quizzical.page.html',
  styleUrls: ['./quizzical.page.scss'],
})
export class QuizzicalPage implements OnInit {


  // Get a reference to the database service
 database = firebase.database();


 
  constructor(public userService : UserService, public toastController: ToastController) { 

 
  }


ngOnInit() 
{

  
  }


}