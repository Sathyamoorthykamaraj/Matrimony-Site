# Matrimony Swipe Application

A modern matrimony-style web application built using Ionic + Angular, featuring swipe-based profile interaction similar to popular matchmaking apps.

---

## 🚀 Features

- 🔄 Swipe Right → Mark as **Interested**
- ❌ Swipe Left → Mark as **Not Interested**
- ⭐ Swipe Up → **Shortlist Profile**
- 📱 Fully responsive (Mobile + Desktop)
- 🔔 Toast notifications for each action
- 📂 LocalStorage-based profile management
- 🔁 Dynamic profile navigation

---

## 🧠 Key Functionality

### Swipe Gesture Handling
Implemented using Ionic GestureController:
- Detects horizontal & vertical swipe
- Triggers actions based on swipe direction
- Smooth card animation with rotation & translation

### Routing
- Default screen → Swipe Screen
- Navigation:
  - Swipe Screen → Search Screen
  - Profile View Page

### State Management
- Profiles stored in `localStorage`
- Each action updates profile status:
  - Interested
  - Not Interested
  - Shortlisted

---

## 🛠️ Tech Stack

- Angular (Standalone Components)
- Ionic Framework
- TypeScript
- HTML5 + SCSS
- LocalStorage (Client-side persistence)

---

## 📂 Project Structure
