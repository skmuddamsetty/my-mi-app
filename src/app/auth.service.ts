import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<{}> = new BehaviorSubject(new Object({}));
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private googlePlus: GooglePlus
  ) {}

  getCurrentUserObservable() {
    return this._user.asObservable();
  }

  emailSignUp(email: string, password: string, username: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user, username); // create initial user document
      })
      .catch(error => console.log(error));
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user, username: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      username: username
    };
    return userRef.set(data);
  }

  signin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleSignin() {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  async onWebGoogleLogin(): Promise<void> {
    // try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth
      .signInWithPopup(provider)
      .then(user => {
        const userObj = user as any;
        this._user.next(userObj);
        return this.setUserDoc(userObj.user, userObj.user.displayName); // create initial user document
      })
      .catch(error => console.log(error));
    // } catch (err) {
    //   console.log(err);
    // }
  }

  async onNativeGoogleLogin(): Promise<void> {
    // try {
    const gPlusUser = await this.googlePlus.login({
      webClientId: '110606421758-awdaw.apps.googleusercontent.com',
      offline: true
    });
    return await this.afAuth.auth
      .signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      )
      .then(user => {
        const userObj = user as any;
        this._user.next(userObj);
        return this.setUserDoc(user, user.displayName); // create initial user document
      })
      .catch(error => console.log(error));
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
