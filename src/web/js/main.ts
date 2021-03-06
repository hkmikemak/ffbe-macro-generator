import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './modules/app.module'

import 'zone.js/dist/zone'
import '@angular/localize/init'

enableProdMode()
platformBrowserDynamic().bootstrapModule(AppModule)
