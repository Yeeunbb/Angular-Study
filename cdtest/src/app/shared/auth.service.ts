import {Injectable, NgZone} from '@angular/core';
import { User } from "../shared/services/user";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user=> {
            if(user){
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['main']);
            });
            this.SetUserData(result.user);
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            this.SetUserData(result.user);
        }).catch((error)=>{
            window.alert(error.message)
        })
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null ) ? true : false;
    }

    GoogleAuth() {
        return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }

    AuthLogin(provider){
        return this.afAuth.signInWithPopup(provider)
        .then((result) => {
            this.ngZone.run(()=>{
                this.router.navigate(['main']);
            })
            this.SetUserData(result.user);
        }).catch((error)=>{
            window.alert(error)
        })
    }

    SetUserData(user){
        const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');
        const userData: User = {
            uid: user.uid,
            email: user.email
        }
        return userRef.set(userData, {
            merge: true
        })
    }
    SignOut() {
        return this.afAuth.signOut().then(() => {
          localStorage.removeItem('user');
          this.router.navigate(['login']);
        })
      }

//     user: User;
//     auth = firebase.auth;

//     constructor(public afAuth: AngularFireAuth, private router: Router) {
//       this.afAuth.authState.subscribe(user => {
//         console.log("constructor");
//         if (user) {
//           console.log('if constructor');
//             this.user = user;
//             localStorage.setItem('user', JSON.stringify(this.user));
//         } else {
//           console.log('else constructor;)');
//             localStorage.setItem('user', null);
//         }
//     });
//     }

//     async Googlelogin() {
//       console.log('auth coco;');
//       return await this.afAuth.signInWithPopup(new this.auth.GoogleAuthProvider());
//     }

//     async logout() {
//       return await this.afAuth.signOut();
//     }

//     isLoggedIn(): boolean {
//       return JSON.parse(localStorage.getItem('user'));
//     }
 }
