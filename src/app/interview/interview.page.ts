import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss']
})
export class InterviewPage implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
