import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QA } from './models/qa.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _qa = new BehaviorSubject([]);
  private _currentCategory: BehaviorSubject<{}> = new BehaviorSubject(
    new Object({})
  );
  private _colorsObj: BehaviorSubject<{}> = new BehaviorSubject(new Object({}));
  private _interviewIntents = new BehaviorSubject([]);

  constructor() {}

  getCurrentCategory() {
    return this._currentCategory.asObservable();
  }

  setCurrentCategory(category: string, title: string) {
    const tempCategory = {
      category: category,
      title: title
    };
    this._currentCategory.next(tempCategory);
  }

  getColors() {
    return this._colorsObj.asObservable();
  }

  setColors(obj: any) {
    this._colorsObj.next(obj);
  }

  getQAObservable() {
    return this._qa.asObservable();
  }

  setQAArray(interviews: QA[]) {
    this._qa.next(interviews);
  }

  getInterviewIntents() {
    return this._interviewIntents.asObservable();
  }

  setInterviewIntents(interviewIntents: any) {
    this._interviewIntents.next(interviewIntents);
  }
}
