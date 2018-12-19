import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMacroGroup } from "..";
import { deepFreeze } from "../shared/freeze";

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
    const result = this.dataSource.getValue();
    return result;
  }
  public setValue(newValue: IMacroGroup[]) { this.dataSource.next(newValue); }

  public updateCurrent() {
    const result = this.dataSource.getValue();
    this.dataSource.next(result);
  }
}
