import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{
  requests: any[] = [];
  isAuthorized: boolean = false;
  password: string = '';
  apiUrl = 'https://healthcare-api-server.vercel.app/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if(this.isAuthorized)
    {
      this.fetchRequests();
    }
  }

  login()
  {
    const adminKey: string = 'admin';
    if(this.password === adminKey)
    {
      this.isAuthorized = true;
      this.fetchRequests();

    }
    else
    {
      alert('Unauthorized: Incorrect credentials');
      this.password = '';
    }

  }

  fetchRequests() {
    this.http.get<any[]>(`${this.apiUrl}/dashboard`).subscribe(data => {
      this.requests = data.requests;
    });
  }

  updateRequestStatus(requestId: string, newStatus: string) {
    const params = new HttpParams().set('new_status', newStatus);

    this.http.patch(`${this.apiUrl}/request/${requestId}`, {}, { params })
      .subscribe({
        next: () => {
          this.fetchRequests(); // Refresh to show new status indicator
          console.log(`Request ${requestId} updated to ${newStatus}`);
        },
        error: (err) => console.error('Update failed', err)
      });
  }

  deleteRequest(requestId: string)
  {
    if(confirm('Permanently delete this request?'))
    {
      this.http.delete(`${this.apiUrl}/request/${requestId}`)
      .subscribe({
        next: () => {
          this.requests = this.requests.filter(req => req.id !== requestId);
          console.log(`Deleted: ${requestId}`);
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}

