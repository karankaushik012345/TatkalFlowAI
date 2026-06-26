# TatkalFlow AI

TatkalFlow AI is a legally compliant, user-assistive MERN stack SaaS application designed to optimize preparedness for IRCTC Tatkal ticket booking.

## Prerequisites
- Node.js >= 20
- Docker & Docker Compose
- MongoDB
- Redis

## Development Setup
Run the following command to start the entire stack locally:
```bash
docker-compose up -d
```

## Features
- **Tatkal Dashboard**: Countdown timers, opening schedules, and readiness status.
- **Passenger Profile Vault**: Secure storage for frequent traveler details with one-click copy.
- **Journey Templates**: Saved routes (Source, Destination, Class, Quota, Passengers).
- **Productivity Mode**: Distraction-free UI during the booking window.
- **Availability Tracker**: Historical seat availability trends and demand heatmaps.
- **Real-Time Alert System**: Multi-channel notifications (Browser, Email, SMS via MSG91).
- **SaaS Tiers**: Integrated with Razorpay for subscription management.

## Environment Variables
Ensure you have `.env` files set up in both `frontend` and `backend` directories. Refer to the `.env.example` files.
