import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // 使 isLoading 可以被其他組件訂閱
  public readonly isLoading$ = this._isLoading.asObservable();

  constructor() { }

  // 控制加載指示器的顯示和隱藏
  loading(isVisible: boolean): void {
    this._isLoading.next(isVisible);
  }
}
