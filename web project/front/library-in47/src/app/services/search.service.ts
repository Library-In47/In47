// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private textSubject: BehaviorSubject<string>
  public textObservable: Observable<string> 

  constructor() {
    this.textSubject = new BehaviorSubject<string>('')
    this.textObservable = this.textSubject.asObservable()
   }

   emitText(chars: string){
    this.textSubject.next(chars)
   }

  }