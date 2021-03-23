import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsyncValidator } from './validation/asyncValidator';
import { UniqueService } from './services/unique.service';
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <ac-header></ac-header>
    <div class="page">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Async Validation Example';

  constructor(private uniqueService:UniqueService) { }
  user=new FormGroup({
    username:new FormControl('',[Validators.required],
    [AsyncValidator.checkUserName(this.uniqueService)])
  })
}
