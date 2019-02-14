import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.page.html',
  styleUrls: ['./interview-list.page.scss']
})
export class InterviewListPage implements OnInit, OnDestroy {
  // LOCAL VARIABLES
  interviewArrayFromDB = [];
  interviewArray = [];
  isLoading = false;
  category: string;
  // LOCAL OBSERVABLES
  _interviewList: Observable<any>;
  // FIREBASE RELATED VARIABLES
  private _interviewCollection: AngularFirestoreCollection<any>;
  _interviewObservable: Observable<any[]>;
  _interviewSubscription: Subscription;
  private allSubscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.allSubscriptions.push(
      this.dataService
        .getInterviewListObservable()
        .subscribe(interviewsList => {
          this.interviewArray = interviewsList;
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
            this._interviewCollection = this.afs.collection<any>(
              'interviews',
              ref => {
                return ref.where('tags', 'array-contains', this.category);
              }
            );
            this._interviewSubscription = this._interviewCollection
              .snapshotChanges()
              .pipe(
                map(actions => {
                  this.interviewArrayFromDB = actions.map(a => {
                    const data = a.payload.doc.data() as any;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  });
                })
              )
              .subscribe(res => {
                console.log(this.interviewArrayFromDB);
                this.dataService.setInterviewListArray(
                  this.interviewArrayFromDB
                );
                this._interviewSubscription.unsubscribe();
                this.isLoading = false;
              });
            this.allSubscriptions.push(this._interviewSubscription);
          }
        }
      })
    );
  }

  onItemClick(id: string, intervieIntents: any) {
    this.dataService.setInterviewIntents(intervieIntents);
    this.router.navigate(['/interview', id]);
  }

  unSubscribeFromSubscriptions() {
    this.allSubscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.unSubscribeFromSubscriptions();
  }
}
