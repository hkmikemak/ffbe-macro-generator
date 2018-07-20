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

  public getValue() { return this.dataSource.getValue(); }
  public setValue(newValue: IMacroGroup[]) { this.dataSource.next(newValue); }
}
