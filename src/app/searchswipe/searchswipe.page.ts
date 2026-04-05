import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface MatchProfile {
  id: number;
  name: string;
  age: number;
  height: string;
  community: string;
  subCommunity: string;
  profession: string;
  location: string;
  image: string;
  status?: string;
}

@Component({
  selector: 'app-searchswipe',
  templateUrl: './searchswipe.page.html',
  styleUrls: ['./searchswipe.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchswipePage implements OnInit {
  profiles: MatchProfile[] = [];
  totalPending = 8;
  newCount = 5;

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seedLocalStorage();
    this.loadProfiles();
  }

  seedLocalStorage(): void {
    const existing = localStorage.getItem('matrimony_profiles');

    if (!existing) {
      const demoProfiles: MatchProfile[] = [
        {
          id: 1,
          name: 'Rashmika',
          age: 27,
          height: '5 ft 2 in',
          community: 'Tamil',
          subCommunity: 'Nair',
          profession: 'MBBS, Doctor',
          location: 'Chennai, Tamil Nadu, India.',
          image: 'assets/profiles/profile1.jpg',
          status: ''
        },
        {
          id: 2,
          name: 'Trisha',
          age: 26,
          height: '5 ft 2 in',
          community: 'Tamil',
          subCommunity: 'Nair',
          profession: 'MBBS, Doctor',
          location: 'Tamil Nadu, India.',
          image: 'assets/profiles/profile2.jpg',
          status: ''
        },
        {
          id: 3,
          name: 'Kiara',
          age: 25,
          height: '5 ft 4 in',
          community: 'Tamil',
          subCommunity: 'Nair',
          profession: 'Software Engineer',
          location: 'Coimbatore, Tamil Nadu, India.',
          image: 'assets/profiles/profile3.jpg',
          status: ''
        },
        {
          id: 4,
          name: 'Kalyani',
          age: 28,
          height: '5 ft 3 in',
          community: 'Tamil',
          subCommunity: 'Nair',
          profession: 'Dentist',
          location: 'Madurai, Tamil Nadu, India.',
          image: 'assets/profiles/profile4.jpg',
          status: ''
        },
        {
          id: 5,
          name: 'Alia',
          age: 24,
          height: '5 ft 1 in',
          community: 'Tamil',
          subCommunity: 'Nair',
          profession: 'Architect',
          location: 'Salem, Tamil Nadu, India.',
          image: 'assets/profiles/profile5.jpg',
          status: ''
        }
      ];

      localStorage.setItem('matrimony_profiles', JSON.stringify(demoProfiles));
    }
  }

  loadProfiles(): void {
    const data = localStorage.getItem('matrimony_profiles');
    this.profiles = data ? JSON.parse(data) : [];
  }

  async onDecision(profile: MatchProfile, decision: 'Yes' | 'No'): Promise<void> {
    profile.status = decision;
    localStorage.setItem('matrimony_profiles', JSON.stringify(this.profiles));

    if (decision === 'Yes') {
      this.openProfile(profile.id);
      return;
    }

    const toast = await this.toastCtrl.create({
      message: `${profile.name} marked as ${decision}`,
      duration: 1200,
      position: 'bottom'
    });

    await toast.present();
  }

  goToSwipeScreen(): void {
    this.router.navigate(['/swipescreen']);
  }

  openProfile(profileId: number): void {
    this.router.navigate(['/viewprofile', profileId]);
  }

  trackByProfile(index: number, item: MatchProfile): number {
    return item.id;
  }

  onImageError(event: Event, profileId: number): void {
    const target = event.target as HTMLImageElement;
    target.src = `assets/profiles/profile${profileId}.jpg`;
  }
}