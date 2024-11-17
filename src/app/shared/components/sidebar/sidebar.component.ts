import { Component, computed } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from "../menu/menu.component";
import { signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { TablasComponent } from "../../../bussiness/tablas/tablas.component";
import { PerfilComponent } from "../../../bussiness/perfil/perfil.component";
import { DashboardComponent } from "../../../bussiness/dashboard/dashboard.component";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MenuComponent, RouterOutlet,
    RouterLink, RouterLinkActive, TablasComponent, PerfilComponent, DashboardComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SiderbarComponent {

  collapsed=signal(false);
  sidevabWidth=computed(()=>this.collapsed() ? '65px' : '250px');
}
