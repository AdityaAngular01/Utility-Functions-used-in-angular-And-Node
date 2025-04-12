import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from '../storage/local/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private isSystemTheme = false;

  constructor(
    private localstorageServ: LocalStorageService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
    this.listenToSystemThemeChanges();
  }

  initTheme(): void {
    const savedTheme = this.localstorageServ.getTheme();
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.isSystemTheme = false;
      this.applyTheme(savedTheme);
    } else {
      this.setSystemTheme();
    }
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.isSystemTheme = false;
    this.localstorageServ.setTheme(theme);
    this.applyTheme(theme);
  }

  setSystemTheme(): void {
    this.isSystemTheme = true;
    localStorage.removeItem('theme')
    this.applySystemTheme();
  }

  toggleTheme(): void {
    const currentTheme = this.localstorageServ.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(currentTheme);
  }

  getTheme(): string {
    return this.localstorageServ.getTheme() || '';
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }

  private applySystemTheme(): void {
    const prefersDark = this.systemThemeMediaQuery.matches;
    this.applyTheme(prefersDark ? 'dark' : 'light');
  }

  private listenToSystemThemeChanges(): void {
    this.systemThemeMediaQuery.addEventListener('change', e => {
      if (this.isSystemTheme) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}