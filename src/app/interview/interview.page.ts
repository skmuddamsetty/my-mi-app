import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss']
})
export class InterviewPage implements OnInit, OnDestroy {
  colorsObj: any;
  interviewArrayFromDB = [];
  interviewArray = [];
  count = 0;
  endOfQuestions = false;
  private interviewId: string;
  // LOCAL OBSERVABLES
  interviewIntentsSubscription: Subscription;
  backgroundColorSubscription: Subscription;
  private allSubscriptions: Subscription[] = [];
  // FIREBASE RELATED VARIABLES
  _interviewSubscription: Subscription;
  constructor(
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.allSubscriptions.push(
      this.dataService.getColors().subscribe(colorsObj => {
        this.colorsObj = colorsObj;
      })
    );
    this.allSubscriptions.push(
      this.dataService.getInterviewIntents().subscribe(interviewIntents => {
        this.interviewArrayFromDB = interviewIntents;
        if (this.interviewArrayFromDB.length > 0) {
          this.interviewArray.push(this.interviewArrayFromDB[this.count]);
        }
        if (this.interviewArray.length <= 0) {
          this.allSubscriptions.push(
            this.route.paramMap.subscribe((paramMap: ParamMap) => {
              if (paramMap.has('id')) {
                this.interviewId = paramMap.get('id');
                this.allSubscriptions.push(
                  this.afs
                    .doc<any>('interviews/' + this.interviewId)
                    .valueChanges()
                    .subscribe(interview => {
                      this.interviewArrayFromDB = interview.intents;
                      if (this.interviewArrayFromDB.length > 0) {
                        this.interviewArray.push(
                          this.interviewArrayFromDB[this.count]
                        );
                      }
                      if (this._interviewSubscription) {
                        this._interviewSubscription.unsubscribe();
                      }
                    })
                );
              }
            })
          );
        }
      })
    );
  }

  showNextQuestion() {
    this.count++;
    if (this.count >= this.interviewArrayFromDB.length) {
      this.endOfQuestions = true;
      return;
    }
    this.interviewArray.push(this.interviewArrayFromDB[this.count]);
  }

  unSubscribeFromSubscriptions() {
    this.allSubscriptions.forEach(sub => {
      sub.unsubscribe();
      console.log(sub, 'unsub');
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.unSubscribeFromSubscriptions();
  }

  @HostListener('window:beforeunload')
  doSomething() {
    this.unSubscribeFromSubscriptions();
  }
}
