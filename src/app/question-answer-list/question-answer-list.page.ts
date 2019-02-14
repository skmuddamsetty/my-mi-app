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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-question-answer-list',
  templateUrl: './question-answer-list.page.html',
  styleUrls: ['./question-answer-list.page.scss']
})
export class QuestionAnswerListPage implements OnInit, OnDestroy {
  // LOCAL VARIABLES
  currentCategory: any;
  category: string;
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
  private allSubscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    private modalCtrl: ModalController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._qa = this.dataService.getQAObservable();
    this.allSubscriptions.push(
      this.dataService.getColors().subscribe(colorsObj => {
        this.colorsObj = colorsObj;
      })
    );
    this.allSubscriptions.push(
      this.dataService.getCurrentCategory().subscribe(currentCategory => {
        this.currentCategory = currentCategory;
      })
    );
    this.allSubscriptions.push(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.isLoading = true;
        if (paramMap.has('category')) {
          this.category = paramMap.get('category');
          if (!this.category) {
            this.router.navigate(['/home']);
            return;
          }
          if (this.category) {
            this.currentCategory = {
              category: this.category
            };
            this._qaCollection = this.afs.collection<QA>('qa', ref => {
              return ref.where('tags', 'array-contains', this.category);
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
            this.allSubscriptions.push(this._qaSubscription);
          }
        }
      })
    );
  }

  unSubscribeFromSubscriptions() {
    this.allSubscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
      console.log('unsub');
    });
  }

  ngOnDestroy() {
    this.unSubscribeFromSubscriptions();
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
