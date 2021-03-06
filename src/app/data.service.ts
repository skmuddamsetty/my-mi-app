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

  getQAObservable() {
    return this._qa.asObservable();
  }

  setQAArray(interviews: QA[]) {
    this._qa.next(interviews);
  }
}
