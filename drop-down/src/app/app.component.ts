import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly options = ['cut', 'copy', 'paste']

  test(value: string): void {
    console.log(value);
  }
}
