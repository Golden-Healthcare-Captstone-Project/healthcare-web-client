import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

type SocialLink = {
  label: string;
  handle: string;
  url: string;
  updates: string[];
};

@Component({
  selector: 'app-social-media-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-media-links.component.html',
  styleUrl: './social-media-links.component.css'
})
export class SocialMediaLinksComponent implements OnInit {
  constructor(private apiService: ApiService) {}

    readonly links: SocialLink[] = [
    {
      label: 'Facebook',
      handle: '@goldenhealthcare',
      url: 'https://www.facebook.com/',
      updates: [
        'Feed placeholder: care team spotlight post.'
      ]
    },
    {
      label: 'Instagram',
      handle: '@goldenhealthcare',
      url: 'https://www.instagram.com/',
      updates: [
        'Feed placeholder: photo highlights from daily activities.',
      ]
    }
  ];
  ngOnInit(): void {
    this.apiService.getSocialFeed().subscribe({
      next: (response) => {
        const facebook = this.links.find(link => link.label === 'Facebook');
      
        if (facebook && response.status === 'blocked') {
          facebook.updates = [response.message];
        }
      },
      error: (error) => {
        console.error('Social feed error:', error);
      }
    });
  }
}
