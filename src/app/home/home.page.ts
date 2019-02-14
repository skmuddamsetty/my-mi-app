import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private afs: AngularFirestore) {
    console.log(this.ques);
    let byDate = this.ques.slice(0);
    byDate.sort(function(a, b) {
      return a.no - b.no;
    });
    console.log('by date:');
    console.log(byDate);
  }
  ques = [
    {
      question: 'What is Angular?',
      formattedAnswer: `<p>Angular is a framework that is used to build client applications by making use of HTML and TypeScript. Angular applications are written using TypeScript.
    Basic Building blocks of Angular application are: Modules, Components, Templates, Directives, Data Binding, Services, Dependency Injection, Routing.</p>
    <ol class="rounded-list">
    <li><p><span class="list-sub-heading">Modules:</span> An NgModule is a collection of metadata such as components, directives, services, pipes. A component factory is created by angular framework when these resources are added to the NgModule metadata.</p></li>
    <li><p><span class="list-sub-heading">Components:</span> An Angular component is a class which contains application data and logic which is associated with an HTML template that defines a view to be displayed in a target environment. Angular identifies the class as 
    an Angular component by looking for @Component decorator on the class defintion.</p></li>
    <li><p><span class="list-sub-heading">Templates:</span> Templates are nothing but HTML which is combined with angular markup to make the form helpful for modifying it dynamically bu using Event Binding and Property Binding.</p></li>
    <li><p><span class="list-sub-heading">Services:</span> These are classes which are used to share the data across components.</p></li>
    <li><p><span class="list-sub-heading">Routing:</span> Angular routing helps to navigate the user to a different page based on the url provided in the browser and it does it without refreshing the page.</p></li>
    </ol>`,
      no: 1
    },
    {
      question:
        'Then the interviewer might ask below question: What is TypeScript?',
      formattedAnswer: `<p>TypeScript is a superset of JavaScript which primarily provides optional static typing, 
    classes and interfaces. TypeScript enables IDEs to provide a richer environment for spotting common errors 
    as you type the code. For a large JavaScript project, adopting TypeScript might result in more robust software, 
    while still being deployable where a regular JavaScript application would run.</p>`,
      no: 2
    },
    {
      question:
        'Since we are talking about static typing, Interviewer might be ineterested in asking What is optional static typing and type inference?',
      formattedAnswer: `<p>JavaScript is dynamically typed. This means JavaScript does not know what type a variable is until it is actually instantiated at run-time. This also means that it may be too late. TypeScript adds type support to JavaScript. Bugs that are caused by false assumptions of some variable being of a certain type can be completely eradicated if you play your cards right (how strict you type your code or if you type your code at all is up to you).<p>

    <p>TypeScript makes typing a bit easier and a lot less explicit by the usage of type inference. For example: var temp = 'TypeScript' in TypeScript is the same as <pre><span>var temp : string = 'TypeScript'.</span></pre> The type is simply inferred from its use. Even it you don't explicitly type the types, they are still there to save you from doing something which otherwise would result in a run-time error.<p>
    
    <p>TypeScript is optionally typed by default. For example 
    <pre><span>function divideByTwo(x) {</span>
    <span>    return x / 2;</span>
    <span>}</span></pre> is a valid function in TypeScript which can be called with any kind of parameter, even though calling it with a string will obviously result in a runtime error. Just like you are used to in JavaScript. This works, because when no type was explicitly assigned and the type could not be inferred, like in the divideByTwo example, TypeScript will implicitly assign the type any. This means the divideByTwo function's type signature automatically becomes function divideByTwo(x : any) : any. There is a compiler flag to disallow this behavior: --noImplicitAny. Enabling this flag gives you a greater degree of safety, but also means you will have to do more typing.<p>
    
    <p>Types have a cost associated with them. First of all there is a learning curve, and second of all, of course, it will cost you a bit more time to set up a codebase using proper strict typing too. In my experience, these costs are totally worth it on any serious codebase you are sharing with others. A Large Scale Study of Programming Languages and Code Quality in Github suggests that "that statically typed languages in general are less defect prone than the dynamic types, and that strong typing is better than weak typing in the same regard.<p>`,
      no: 3
    },
    {
      question:
        'Since you have answered very well about the TypeScript. Interviewer might shift the focus to Angular and ask you What are Components in Angular?',
      formattedAnswer: `<p>An Angular component is a class which contains application data and logic which is associated with an HTML template that defines a view to be displayed in a target environment. Angular identifies the class as 
    an Angular component by looking for @Component decorator on the class defintion.</p>`,
      no: 4
    },
    {
      question:
        'Then the question might be like how do you associate a component with an HTML template?',
      formattedAnswer: `we can do it by using templateUrl.<p>templateUrl is the relative path or absolute URL of a template file for an Angular component. If provided, do not supply an inline template using template.</p>
    <p>Ex: <pre></span>
    <span>@Component({</span>
    <span>  selector: 'my-app',</span>
    <span>  templateUrl: 'app.component.html'</span>
    <span>})</span>
    <span>export class AppComponent {</span>
    <span>}</span>
    <span></pre></p>
    <p>In the above example we are associating AppComponent with app.component.html by using templateUrl</p>`,
      no: 5
    },
    {
      question:
        'Then the interviewer might ask, What is the difference between template and templateUrl?',
      formattedAnswer: `template is used as An inline template for an Angular component. we can use either template or templateUrl but not both.
    <p>Ex: <pre></span>
    <span>@Component({</span>
    <span>  selector: 'my-app',</span>
    <span>  template: \`<h1>My Angular App</h1>\`</span>
    <span>})</span>
    <span>export class AppComponent {</span>
    <span>}</span>
    <span></pre></p>`,
      no: 6
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
    let interview = {
      intents: this.ques,
      title: 'Interview 2',
      tags: ['angular', 'typescript']
    };
    this.afs.collection('interviews').add(interview);
    // this.array.forEach(el => {
    //   this.afs.collection('sidenavitems').add(this.array);
    // });
    console.log('Data Upload Complete');
  }
}
