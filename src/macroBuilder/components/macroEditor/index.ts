import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop'
import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { IMacroGroup, NewMacroGroupDialogComponent } from '../..'
import { IMacroItem } from '../../interfaces/macroItem'
import { MacroGroupService } from '../../services/macroGroupService'

@Component({
  selector: 'macro-editor',
  styleUrls: ['./index.css'],
  templateUrl: './index.html',
})
export class MacroEditorComponent {
  constructor (private modalService: NgbModal, public macroGroupService: MacroGroupService) {
  }

  public addGroup () {
    const modal = this.modalService.open(NewMacroGroupDialogComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
    })
    modal.result
      .then((result: IMacroGroup[]) => {
        if (result) {
          this.macroGroupService.setValue([...this.macroGroupService.getValue(), ...result])
        }
      })
      .catch(() => undefined)
  }

  public deleteGroup (index: number) {
    this.macroGroupService.getValue().splice(index, 1)
    this.macroGroupService.updateCurrent()
  }

  public itemDrop (event: CdkDragDrop<IMacroItem[]>) {
    if (event.currentIndex !== event.previousIndex) {
      moveItemInArray(this.macroGroupService.getValue(), event.previousIndex, event.currentIndex)
      this.macroGroupService.updateCurrent()
    }
  }
}
