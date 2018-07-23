import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMacroGroup } from "..";

@Injectable({
  providedIn: "root",
})
export class MacroGroupService {
  public observable: Observable<IMacroGroup[]>;
  private dataSource: BehaviorSubject<IMacroGroup[]>;

  constructor() {
    this.dataSource = new BehaviorSubject<IMacroGroup[]>([]);
    this.observable = this.dataSource.asObservable();
  }

  public getValue() {
    let result = this.dataSource.getValue();
//    Object.freeze(result);
    return result;
  }
  public setValue(newValue: IMacroGroup[]) { this.dataSource.next(newValue); }
}
