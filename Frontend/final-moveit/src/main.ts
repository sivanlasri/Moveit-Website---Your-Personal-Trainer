import { bootstrapApplication } from '@angular/platform-browser'; // Angular function to bootstrap standalone apps
import { appConfig } from './app/app.config'; // Your app-wide configuration (routing, providers, etc.)
import { AppComponent } from './app/app.component'; // The root Angular component of your app

// Bootstraps (starts) the Angular application with the root component and the app configuration
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err)); // Log any errors that occur during bootstrap
