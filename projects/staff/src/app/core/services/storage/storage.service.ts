import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  /**set SessionStorage */
  setSessionStorage(key: string, value: any) {
    const jsonString = JSON.stringify(value);
    sessionStorage.setItem(key, jsonString);
  }
  /**get SessionStorage */
  getSessionStorage<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    const json = JSON.parse(value!) ?? null;
    return json;
  }

  /**去除 指定SessionStorage */
  removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }
  /**清空 全部SessionStorage */
  clearSessionStorage() {
    sessionStorage.clear();
  }

  /**set LocalStorage */
  setLocalStorage(key: string, value: any) {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  }
  /**get LocalStorage */
  getLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    const json = JSON.parse(value!) ?? null;
    return json;
  }
  /**去除 指定LocalStorage */
  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
  /**清空 全部LocalStorage */
  clearLocalStorage() {
    localStorage.clear();
  }
}
