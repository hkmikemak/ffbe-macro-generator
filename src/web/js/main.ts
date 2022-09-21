import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './modules/app.module'

import '@angular/localize/init'
import 'zone.js/dist/zone'

enableProdMode()
platformBrowserDynamic().bootstrapModule(AppModule)
