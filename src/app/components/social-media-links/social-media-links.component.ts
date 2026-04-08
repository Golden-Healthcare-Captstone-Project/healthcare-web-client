import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
export class SocialMediaLinksComponent {
  readonly links: SocialLink[] = [
    {
      label: 'Facebook',
      handle: 'Ex: @goldenhealthcare',
      url: 'https://www.facebook.com/',
      updates: [
        'Feed placeholder: care team spotlight post.'
      ]
    },
    {
      label: 'Instagram',
      handle: 'Ex: @goldenhealthcare',
      url: 'https://www.instagram.com/',
      updates: [
        'Feed placeholder: photo highlights from daily activities.',
      ]
    }
  ];
}
