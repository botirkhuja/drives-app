import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(db: AngularFirestore) {
    db.collection('drivers').get().subscribe( response => {
      response.docs.forEach( doc => {
        console.log(doc.data())

      });
    })
  }

  title = 'drives-app';
}
