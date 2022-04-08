import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService) {}

  public isAdmin = false;

  ngOnInit(): void {
    this.authService.userRoles
    .subscribe(roles => {
      this.isAdmin = !!roles.find((r) => r.role === 'admin');
    })
  }
}
