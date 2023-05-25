import { Injectable } from '@angular/core';
import { ProfileData } from '../../models/profile-data.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /** 登入者資料 */
  profileData$ = new ReplaySubject<ProfileData>();

  constructor() { }

  /**
   * 取得身分可進入的頁面
   */
  getProfileData(): Observable<ProfileData> {
    return this.profileData$.asObservable();
  }

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
  getLocalStorage<T>(key: string): T | null {
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
