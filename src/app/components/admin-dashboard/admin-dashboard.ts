import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  requests: any[] = [];
  apiUrl = 'http://healthcare-api-server.vercel.app/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.requests = data.requests;
    });
  }
}
