import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Gesture,
  GestureController,
  IonicModule,
  ToastController
} from '@ionic/angular';
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

type SwipeAction = 'Interested' | 'Not Interested' | 'Shortlisted';

@Component({
  selector: 'app-swipescreen',
  templateUrl: './swipescreen.page.html',
  styleUrls: ['./swipescreen.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SwipescreenPage implements AfterViewInit {
  @ViewChild('swipeCard', { read: ElementRef }) swipeCard!: ElementRef;

  profiles: MatchProfile[] = [];
  currentIndex = 0;
  private gesture?: Gesture;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  isAnimating = false;

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private gestureCtrl: GestureController,
    private ngZone: NgZone
  ) {
    this.loadProfiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initGesture();
    }, 100);
  }

  get currentProfile(): MatchProfile | null {
    if (this.currentIndex >= this.profiles.length) {
      return null;
    }
    return this.profiles[this.currentIndex];
  }

  get nextProfile(): MatchProfile | null {
    if (this.currentIndex + 1 >= this.profiles.length) {
      return null;
    }
    return this.profiles[this.currentIndex + 1];
  }

  loadProfiles(): void {
    const data = localStorage.getItem('matrimony_profiles');
    this.profiles = data ? JSON.parse(data) : [];
  }

  initGesture(): void {
    if (!this.swipeCard) return;

    this.gesture?.destroy();

    this.gesture = this.gestureCtrl.create({
      el: this.swipeCard.nativeElement,
      threshold: 10,
      gestureName: 'profile-swipe',
      onStart: (ev) => {
        if (this.isAnimating) return;
        this.startX = ev.currentX;
        this.startY = ev.currentY;
      },
      onMove: (ev) => {
        if (this.isAnimating) return;

        this.currentX = ev.currentX - this.startX;
        this.currentY = ev.currentY - this.startY;

        const rotate = this.currentX / 20;
        this.setCardStyle(this.currentX, this.currentY, rotate);
      },
      onEnd: () => {
        if (this.isAnimating) return;

        const horizontalThreshold = 120;
        const verticalThreshold = -120;

        if (this.currentX > horizontalThreshold) {
          this.ngZone.run(() => {
            this.handleAction('Interested', 'right');
          });
        } else if (this.currentX < -horizontalThreshold) {
          this.ngZone.run(() => {
            this.handleAction('Not Interested', 'left');
          });
        } else if (this.currentY < verticalThreshold) {
          this.ngZone.run(() => {
            this.handleAction('Shortlisted', 'up');
          });
        } else {
          this.resetCardPosition();
        }
      }
    });

    this.gesture.enable(true);
  }

  setCardStyle(x: number, y: number, rotate: number): void {
    const el = this.swipeCard?.nativeElement;
    if (!el) return;

    el.style.transition = 'none';
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  }

  resetCardPosition(): void {
    const el = this.swipeCard?.nativeElement;
    if (!el) return;

    el.style.transition = 'transform 0.25s ease';
    el.style.transform = 'translate(0px, 0px) rotate(0deg)';
    this.currentX = 0;
    this.currentY = 0;
  }

  async handleAction(action: SwipeAction, direction: 'right' | 'left' | 'up'): Promise<void> {
    if (!this.currentProfile || this.isAnimating) return;

    this.isAnimating = true;
    const profile = this.currentProfile;
    profile.status = action;

    localStorage.setItem('matrimony_profiles', JSON.stringify(this.profiles));

    await this.animateOut(direction);
    await this.presentToast(action);

    this.currentIndex++;
    this.currentX = 0;
    this.currentY = 0;
    this.isAnimating = false;

    setTimeout(() => {
      this.resetCardForNextProfile();
      this.initGesture();
    }, 50);
  }

  async animateOut(direction: 'right' | 'left' | 'up'): Promise<void> {
    const el = this.swipeCard?.nativeElement;
    if (!el) return;

    let transform = '';

    if (direction === 'right') {
      transform = 'translate(420px, 40px) rotate(18deg)';
    } else if (direction === 'left') {
      transform = 'translate(-420px, 40px) rotate(-18deg)';
    } else {
      transform = 'translate(0px, -420px) rotate(0deg)';
    }

    el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    el.style.transform = transform;
    el.style.opacity = '0';

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  resetCardForNextProfile(): void {
    const el = this.swipeCard?.nativeElement;
    if (!el) return;

    el.style.transition = 'none';
    el.style.transform = 'translate(0px, 0px) rotate(0deg)';
    el.style.opacity = '1';
  }

  async presentToast(message: SwipeAction): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1200,
      position: 'bottom'
    });
    await toast.present();
  }

  async onButtonAction(action: SwipeAction): Promise<void> {
    if (action === 'Interested') {
      await this.handleAction('Interested', 'right');
    } else if (action === 'Not Interested') {
      await this.handleAction('Not Interested', 'left');
    } else {
      await this.handleAction('Shortlisted', 'up');
    }
  }

  goBack(): void {
    this.router.navigate(['/searchswipe']);
  }

  onImageError(event: Event, profileId: number): void {
    const target = event.target as HTMLImageElement;
    target.src = `assets/profiles/profile${profileId}.jpg`;
  }
}