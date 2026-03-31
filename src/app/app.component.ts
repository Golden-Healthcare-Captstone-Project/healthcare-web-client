import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocialMediaLinksComponent } from './components/social-media-links/social-media-links.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SocialMediaLinksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'golden-healthcare-web-client';
  readonly currentYear = new Date().getFullYear();
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
