import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { QA, QAId } from '../models/qa.model';
import { map } from 'rxjs/operators';
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-answer-list',
  templateUrl: './question-answer-list.page.html',
  styleUrls: ['./question-answer-list.page.scss']
})
export class QuestionAnswerListPage implements OnInit, OnDestroy {
  // LOCAL VARIABLES
  currentCategory: any;
  qaArray: QA[];
  isLoading = false;
  colorsObj: any;
  // LOCAL OBSERVABLE VARIABLES
  currentCategorySubScription: Subscription;
  backgroundColorSubscription: Subscription;
  // FIREBASE RELATED VARIABLES
  private _qaCollection: AngularFirestoreCollection<QA>;
  _qa: Observable<QAId[]>;
  _qaSubscription: Subscription;

  constructor(
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    private modalCtrl: ModalController,
    public router: Router
  ) {}

  ngOnInit() {
    this.backgroundColorSubscription = this.dataService
      .getColors()
      .subscribe(colorsObj => {
        this.colorsObj = colorsObj;
      });
    this.currentCategorySubScription = this.dataService
      .getCurrentCategory()
      .subscribe(currentCategory => {
        this.isLoading = true;
        this.currentCategory = currentCategory;
        this._qa = this.dataService.getQAObservable();
        if (!this.currentCategory.category) {
          this.router.navigate(['/home']);
          return;
        }
        if (this.currentCategory.category) {
          this._qaCollection = this.afs.collection<QA>('qa', ref => {
            return ref.where(
              'tags',
              'array-contains',
              this.currentCategory.category
            );
          });
          this._qaSubscription = this._qaCollection
            .snapshotChanges()
            .pipe(
              map(actions => {
                this.qaArray = actions.map(a => {
                  const data = a.payload.doc.data() as QA;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                });
              })
            )
            .subscribe(res => {
              console.log(this.qaArray);
              this.dataService.setQAArray(this.qaArray);
              this._qaSubscription.unsubscribe();
              this.isLoading = false;
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.currentCategorySubScription) {
      this.currentCategorySubScription.unsubscribe();
      console.log(
        'currentCategorySubScription unsubscribe from QuestionAnswerListPage'
      );
    }
    if (this.backgroundColorSubscription) {
      this.backgroundColorSubscription.unsubscribe();
    }
  }

  onFavorite(id: string) {
    this.openLoginPage();
  }

  async openLoginPage() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });

    return await modal.present();
  }
}
