import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MacroBuilderModule } from "../../../macroBuilder";
import { AppComponent } from "../components/app";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MacroBuilderModule.forRoot(),
  ],
  providers: [
  ],
})
export class AppModule { }
