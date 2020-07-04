import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
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
    MacroBuilderModule.forRoot(),
  ],
  providers: [
  ],
})
export class AppModule { }
