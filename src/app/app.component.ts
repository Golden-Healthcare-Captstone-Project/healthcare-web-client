import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'golden-healthcare-web-client';
  currentYear = new Date().getFullYear();

  constructor(private api: ApiService) {}


  testBackend() {
    this.api.getServices().subscribe({
      next: (res: any) => console.log('SUCCESS:', res),
      error: (err: any) => console.error('ERROR:', err)
    });
  }

  
  submitForm(notesValue: string) {
    const data = {
      user_id: 1,
      service_id: 1,
      notes: notesValue
    };
  
    this.api.submitRequest(data).subscribe({
      next: (res: any) => {
        console.log("FORM SUBMITTED:", res);
        alert("Request submitted successfully!");
      },
      error: (err: any) => {
        console.error("ERROR:", err);
        alert("Something went wrong.");
      }
    });
  }
  }

