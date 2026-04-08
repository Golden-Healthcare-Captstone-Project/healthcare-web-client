import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { SocialMediaLinksComponent } from './components/social-media-links/social-media-links.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SocialMediaLinksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'golden-healthcare-web-client';
  readonly currentYear = new Date().getFullYear();

  // Backend API
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
        console.log('FORM SUBMITTED:', res);
        alert('Request submitted successfully!');
      },
      error: (err: any) => {
        console.error('ERROR:', err);
        alert('Something went wrong.');
      }
    });
  }

  // Teammate UI (modal logic)
  isVisitModalOpen = false;
  visitStep: 'choice' | 'new-client' | 'existing-client' = 'choice';
  consultationSubmitted = false;

  openVisitModal(): void {
    this.isVisitModalOpen = true;
    this.visitStep = 'choice';
    this.consultationSubmitted = false;
  }

  closeVisitModal(): void {
    this.isVisitModalOpen = false;
  }

  selectVisitPath(path: 'new-client' | 'existing-client'): void {
    this.visitStep = path;
    this.consultationSubmitted = false;
  }

  backToVisitChoice(): void {
    this.visitStep = 'choice';
    this.consultationSubmitted = false;
  }

  submitConsultation(event: Event): void {
    event.preventDefault();
    this.consultationSubmitted = true;
  }
}