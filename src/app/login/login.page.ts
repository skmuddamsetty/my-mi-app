import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private platform: Platform,
    public authService: AuthService,
    public router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  onGoogleSignIn() {
    this.closeModal();
    if (this.platform.is('cordova')) {
      this.authService
        .onNativeGoogleLogin()
        .then(res => {
          if (this.router.url.includes('login')) {
            this.router.navigate(['/home']);
          }
        })
        .catch();
    } else {
      this.authService
        .onWebGoogleLogin()
        .then(res => {
          if (this.router.url.includes('login')) {
            this.router.navigate(['/home']);
          }
        })
        .catch();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
