import { Injectable } from '@angular/core'; // Importing Injectable to create a service that can be injected into other components or services


@Injectable({
  providedIn: 'root' // This service is provided at the root level (singleton)
})
export class AssetsService {
  
  // Base path for login page images
  private readonly loginPageAssetsPath = 'assets/images/login/';
  
  constructor() { }

  /**
   * Returns the full path to an image used on the login page.
   * @param imageName The image filename including extension (e.g., 'logo.png')
   * @returns A full path string to the login page image
   */
  getLoginPageImage(imageName: string): string {
    return `${this.loginPageAssetsPath}${imageName}`;
  }

   /**
   * Returns a full asset path for any given relative path.
   * @param path Relative asset path (e.g., 'images/icons/icon.png')
   * @returns A full path string starting with 'assets/'
   */
  getAssetPath(path: string): string {
    return `assets/${path}`;
  }
}