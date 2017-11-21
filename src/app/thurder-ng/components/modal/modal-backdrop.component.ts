import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ModalOptions} from './modal-options.model';

@Component({
  selector: 'tg-modal-backdrop',
  template: `
    <div class="modal-backdrop {{modalOptions?.backdropClass || ''}}"
         [ngStyle]="{'z-index': (modalOptions?.zIndex || 1040) + instanceCount * 10 +1}"
         [ngClass]="{'in': isOpen}">
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBackdropComponent {
  @Input() isOpen: boolean;
  @Input() modalOptions: ModalOptions;
  @Input() instanceCount = 0;
}
