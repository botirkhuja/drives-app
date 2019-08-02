import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth ) {
    const user = this.afAuth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.getInformation();
      }
    })

  }

  getInformation(){
    this.afs.collection('drivers', ref => ref.where('cell', '==', this.user.phoneNumber)).get().subscribe( response => {
      response.docs.forEach( doc => {
        console.log(doc.data())

      });
    })
  }

  title = 'drives-app';
}
