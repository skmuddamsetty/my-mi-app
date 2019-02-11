import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private afs: AngularFirestore) {}
  interview = [
    {
      question: 'Tell me about yourself',
      answer: 'I am a Java Developer'
    },
    {
      question: 'What was your role as a Java Developer?',
      answer: 'I have written Java Programs'
    }
  ];
  array = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      isAvailable: true,
      category: 'home'
    },
    {
      title: 'JavaScript',
      url: '/question-answer-list',
      icon: 'logo-javascript',
      isAvailable: true,
      category: 'javascript'
    },
    {
      title: 'Angular',
      url: '/question-answer-list',
      icon: 'logo-angular',
      isAvailable: true,
      category: 'angular'
    },
    {
      title: 'React',
      url: '/question-answer-list',
      icon: 'list',
      isAvailable: true,
      category: 'react'
    }
  ];

  onUploadData() {
    this.afs.collection('sidenavitems1').add(this.array);
    // this.array.forEach(el => {
    //   this.afs.collection('sidenavitems').add(this.array);
    // });
    console.log('Data Upload Complete');
  }
}
