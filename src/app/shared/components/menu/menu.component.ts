import { Component, computed, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { signal } from '@angular/core';
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem={
  icon:string;
  label:string;
  route:string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatListModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  sideNavCollapsed=signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  };
  menuItems=signal<MenuItem[]>([
    {icon: 'home', label: 'Dashboard', route: '/dashboard'},
    {icon: 'person', label: 'Perfil', route: '/perfil'},
    {icon: 'tablas', label: 'Tablas', route: '/tablas'}
  ]);

  profilePicsSize=computed(()=>this.sideNavCollapsed()? '32px' : '100px');
}
