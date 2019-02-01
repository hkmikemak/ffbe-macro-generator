import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExportComponent } from "../../../../macroBuilder";
import { ConfigEditorComponent } from "../../../../macroBuilder/components/configEditor";

@Component({
  selector: "app-root",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class AppComponent {
  constructor(private modalService: NgbModal) { }

  public openExport = () => {
    this.modalService.open(ExportComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
  }

  public openConfigEditor = () => {
    this.modalService.open(ConfigEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
  }

}
