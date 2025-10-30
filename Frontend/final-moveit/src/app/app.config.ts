// Import types and providers from Angular's core module
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

// Import routing support for the application
import { provideRouter } from '@angular/router';

// Import the application's route definitions
import { routes } from './app.routes';

// Define the application's configuration object
export const appConfig: ApplicationConfig = {
  providers: [
    // Enables capturing global browser errors (like uncaught exceptions)
    provideBrowserGlobalErrorListeners(),

    // Enables zoneless change detection (performance optimization if you manage change detection manually)
    provideZonelessChangeDetection(),

    // Provides routing configuration using the routes defined in app.routes.ts
    provideRouter(routes)
  ]
};
