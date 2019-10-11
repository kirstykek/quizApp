import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import * as firebase from 'firebase'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

name;
Category_key;
category=[]
Question=[];
Answer=[];
cat_key;
  
    constructor(public userService:UserService) {
this.category= this.userService.getcat();




 // var data= firebase.database().ref().child("Category")
  ///data.on("child_added", snap =>{
   /// this.name=snap.child("cat_name").val();
    ///this.category.push({
     /// Category: this.name,
    //  Category_key: this.cat_key
   // })
  //
    }
 ngOnInit() {


}
setID(cat){
  this.userService.getID(cat);
}
}
