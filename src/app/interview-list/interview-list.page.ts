import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.page.html',
  styleUrls: ['./interview-list.page.scss']
})
export class InterviewListPage implements OnInit {
  // LOCAL VARIABLES
  interviewArrayFromDB = [];
  // FIREBASE RELATED VARIABLES
  private _interviewCollection: AngularFirestoreCollection<any>;
  _interviewObservable: Observable<any[]>;
  _interviewSubscription: Subscription;
  constructor(
    public dataService: DataService,
    private readonly afs: AngularFirestore,
    public router: Router
  ) {}

  ngOnInit() {
    this._interviewCollection = this.afs.collection<any>('interviews', ref => {
      return ref.where('tags', 'array-contains', 'javascript');
    });
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
        this._interviewSubscription.unsubscribe();
      });
  }

  onItemClick(id: string, intervieIntents: any) {
    this.dataService.setInterviewIntents(intervieIntents);
    this.router.navigate(['/interview', id]);
  }
}
