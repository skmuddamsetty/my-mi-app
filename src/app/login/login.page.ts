import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
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
    public router: Router
  ) {}

  ngOnInit() {}

  onGoogleSignIn() {
    if (this.platform.is('cordova')) {
      this.authService
        .onNativeGoogleLogin()
        .then(res => {
          this.router.navigate(['/home']);
        })
        .catch();
    } else {
      this.authService
        .onWebGoogleLogin()
        .then(res => {
          this.router.navigate(['/home']);
        })
        .catch();
    }
  }
}
