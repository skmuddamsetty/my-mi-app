import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];
  // FIREBASE RELATED VARIABLES
  _sideNavSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataService: DataService,
    private readonly afs: AngularFirestore
  ) {
    this.initializeApp();
    this.setAvailableItemsForSideNav();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setCurrentCategory(category: string, title: string) {
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
