import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
 providedIn: 'root'
})
export class UserService {
  database = firebase.database();

  // getting from database
  userId;
  username;
  userUID;
  email;

  name;
  id;
  resultsData
  // database objects (quiz ts)
  cat_name;
  myCategories = [];
  catKey;
  // quiz ts
  Questionz = [];
  options;
  Answers = [];
  ID;
  Counter = 0;

  // getting data from users table
  userzArray = [];
  userNamez;
  userEmail;
  userPaswword;
  userUIDUID;

  // data from category database
  myCategory = [];
  catID: string;
  categoryArrayRes: any;
  myResults: any;
  

  constructor() { }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // log in, sign up and register code
  signin(email, password) 
  {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
      if(result)
      {
 return result
      }
    }).catch((error)=> 
    {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
      return errorMessage
    });
  }

  signup(email,password,name,)
  {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
   if(user){
     this.userId=user['user'].uid;
     this.userEmail=user['user'].email;
     firebase.database().ref('user/'+ this.userId).set({
       name:name,
       email:this.userEmail
     })
   }
     return user;
      }).catch((error)=>
       {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
       return errorMessage
       // ...
     });
   
      // inserting into database
     // firebase.database().ref('users/' + this.userId).set({
       /// username: name,
        ///emails: email,
      //  }, (error) => {
       //   if (error) {
         //   console.log(error);
         // } else {
         //   console.log('New User Saved');
        // // }
        //});
   
  }


  getUserInformation() 
  {
    return new Promise ((resolve) =>
     {
      this.clearArray(this.userzArray);
      const rootRef = firebase.database().ref('users/' + this.userUID);
     rootRef.on('value', (data) => {
      const userzz = data.val();
      this.userNamez = userzz.username;
      this.userEmail = userzz.emails;
      this.userzArray.push({
        name: this.userNamez,
       email: this.userEmail
        // userzz
      });
    resolve(this.userzArray);
       console.log(this.userzArray);
   });
    return this.userzArray;
    });
 }

  logout() 
  {
    firebase.auth().signOut().then(() => 
    {
      console.log('Sign-out successful.');

      // Sign-out successful.
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  resetepassword(email) 
  {
    console.log(email);
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => 
    {
    // Email sent.
    console.log('password reset');
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  // data for category
  getcat() 
  {
    this.clearArray(this.myCategory);
    const data = firebase.database().ref().child('Category');
    data.on('child_added', snap => {
    this.name = snap.child('cat_name').val();
    // console.log(this.name);
    this.id = snap.key;
    //  console.log(this.id);
    // console.log('Heres your key: ' + key);
    this.myCategory.push({
    ID: this.id,
    Category: this.name,
  });
    // console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
    });
    return this.myCategory;
  }

  getUserInfor() 
  {
    return new Promise ((resolve) => {
      this.clearArray(this.userzArray);
      const rootRef = firebase.database().ref('users/' + this.userUID);
      rootRef.on('value', (data) => {
      const userzz = data.val();
      this.userNamez = userzz.username;
      
      this.userEmail = userzz.emails;
      this.userzArray.push({
        name: this.userNamez,
        email: this.userEmail
        // userzz
      });
      resolve(this.userzArray);
      // console.log(this.userzArray);
    });
      return this.userzArray;
    });
  }

  getID(cat) 
  {
    this.userId = cat.ID;
  }

  Return_ID() {
    return this.userId;
  }

  // Quiz TS Code
  firebaseQuiz(ID) 
  {
    this.Counter = 0;
    this.clearArray(this.Questionz);
    const rootRef = firebase.database().ref().child('Quiz/' + ID);
    rootRef.once('value', (snapshot) =>
         {
      let value = snapshot.val();

      // tslint:disable-next-line: forin
      for (let key in value) 
      {
        this.Counter++;
        this.Questionz.push({
          counter: this.Counter,
          Question: key,
          Answer: Object.keys(value[key]),
          value: Object.values(value[key])
        });
        // console.log(this.Questionz);
        // console.log(key);
        // console.log(value);
      }
    });
    console.log(this.Questionz);

    return this.Questionz;
  }

  clearArray(array)
   {
    for (let i = 0; i < array.length; i++) 
    {
      array.splice(i);
  }
 }
results(userId)
{
  this.Counter = 0;
  let resultsquestion;
  let gameID;
  let values;
  this.clearArray(this.myResults);
  const rootRef = firebase.database().ref().child('Results/' + userId);
  rootRef.once('value', (snapshot) => {
      const value = snapshot.val();
      console.log(value);
 // tslint:disable-next-line: align
 return firebase.database().ref().child('Results/' + userId +  name).once('value').then( (snapshot) => {
      const values = snapshot.val();
      console.log(values);

      return snapshot.val();

      // tslint:disable-next-line: forin
      for (const key in value) {
        this.myResults.push({
          category_id: key,
          value: Object.values(value[key]),
          results: Object.keys(value[key]),
          values: value
        });
        console.log(this.myResults);
        console.log(key);
        console.log(value);
      }
    });

});
}

getResultsCat(userId)
{
  console.log(userId);
   let catRes =  firebase.database().ref().child('Results/' + userId);
   catRes.on('child_added', snapshot => {
      this.catID = snapshot.key;
      console.log(this.catID);
      this.categoryArrayRes.push({
        key: this.catID
      });
      });
   console.log(this.categoryArrayRes);
   return this.categoryArrayRes; 
}
UserInfor()
{
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);
    if (user) {
      this.userUID = user.uid;
    } else {
      // No user is signed in.
    }
  });
  return this.userUID;
}
  }