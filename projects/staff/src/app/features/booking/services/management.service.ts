import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  dateSelect$ = new Subject<string>();
  onDestroy$ = new Subject<void>();

  constructor() { }
}
