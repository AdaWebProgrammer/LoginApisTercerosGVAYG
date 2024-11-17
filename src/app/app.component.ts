import { Component } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import { SiderbarComponent } from "./shared/components/sidebar/sidebar.component";
import LoginComponent from './bussiness/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SiderbarComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemaWeb';
}
