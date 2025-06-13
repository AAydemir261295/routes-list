import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutesList } from './components/routesList.component';

@Component({
  selector: 'app-root',
  imports: [RoutesList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'routes-list';

}
