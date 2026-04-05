import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

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
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.page.html',
  styleUrls: ['./viewprofile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewprofilePage implements OnInit {
  profile!: MatchProfile;
  profileId!: number;

  matrimonyId = 'M987654';
  currentImageIndex = 2;
  totalImages = 25;

  imageDots = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.profileId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProfile();
  }

  loadProfile(): void {
    const data = localStorage.getItem('matrimony_profiles');
    const profiles: MatchProfile[] = data ? JSON.parse(data) : [];
    const found = profiles.find((item) => item.id === this.profileId);

    if (found) {
      this.profile = found;
    }
  }

  goBack(): void {
    this.location.back();
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/profiles/profile1.jpg';
  }
}