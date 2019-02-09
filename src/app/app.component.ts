import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];
  isAuthenticated = false;
  // FIREBASE RELATED VARIABLES
  _sideNavSubscription: Subscription;
  _userSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    public router: Router,
    private googlePlus: GooglePlus
  ) {
    this.initializeApp();
    this.setAvailableItemsForSideNav();
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user is Authenticated');
        this.isAuthenticated = true;
        if (this.router.url.includes('login')) {
          this.router.navigate(['/home']);
        }
      } else {
        this.isAuthenticated = false;
        console.log('inside app component else');
        if (this.router.url.includes('login')) {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setCurrentCategory(category: string, title: string) {
    if (title === 'Logout') {
      this.afAuth.auth.signOut();
      if (this.platform.is('cordova')) {
        this.googlePlus.logout();
      }
      this.isAuthenticated = false;
      if (this.router.url.includes('login')) {
        this.router.navigate(['/home']);
      }
    }
    this.dataService.setCurrentCategory(category, title);
  }

  setAvailableItemsForSideNav() {
    this._sideNavSubscription = this.afs
      .collection('sidenavitems')
      .valueChanges()
      .subscribe((sideNavItems: any) => {
        if (
          sideNavItems &&
          sideNavItems[0] &&
          sideNavItems[0].items &&
          sideNavItems[0].items.length > 0
        ) {
          sideNavItems[0].items.forEach(element => {
            this.appPages.push(element);
          });
        }
        this._sideNavSubscription.unsubscribe();
        this.appPages.push([
          {
            isAvailable: true,
            title: 'Home',
            url: '/home',
            icon: 'home',
            category: 'home'
          }
        ]);
      });
  }
}
