import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

 resultsData
 
  constructor(public userService : UserService) { 
   this.userService.results().subscribe((data)=>
   {
this.resultsData=data
console.log(this.resultsData);
   })      
  }

  ngOnInit() {
  }

}