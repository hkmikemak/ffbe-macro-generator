import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { MacroConfig } from '../../memuMacro'
import { deepFreeze } from '../shared/freeze'

@Injectable({
  providedIn: 'root',
})
export class MacroConfigService {
  private dataSource: BehaviorSubject<MacroConfig>;
  public observable: Observable<MacroConfig>;

  constructor () {
    this.dataSource = new BehaviorSubject<MacroConfig>(new MacroConfig())
    this.observable = this.dataSource.asObservable()
  }

  public getValue () {
    const result = this.dataSource.getValue()
    deepFreeze(result)
    return result
  }

  public setValue (newValue: MacroConfig) { this.dataSource.next(newValue) }
}
