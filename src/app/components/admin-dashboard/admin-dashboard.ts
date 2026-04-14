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

  fetchRequests() {
    this.http.get<any[]>(`${this.apiUrl}/requests`).subscribe(data => {
      this.requests = data;
    });
  }

  updateRequestStatus(requestId: string, newStatus: string) {
    this.http.patch(`${this.apiUrl}/requests/${requestId}`, { status: newStatus })
      .subscribe({
        next: () => {
          // 2. Refresh the local list to show the new "indicator" color
          this.fetchRequests();
          console.log(`Request ${requestId} updated to ${newStatus}`);
        },
        error: (err) => console.error('Update failed', err)
      });
  }
}

