import { Component, EventEmitter, Input, Output } from '@angular/core';

// Interfaces
import { IListItems } from '../../interfaces/IListItems.interface';



@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  @Input({ required: true }) public inputListItems: IListItems[] = [];
  @Output() public outputUpdateItemCheckbox = new EventEmitter<{ id: string, checked: boolean}>();
  @Output() public outputUpdateItemValue = new EventEmitter<{ id: string, value: string}>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({id, checked});
  }
  public updateItemValue(id: string, value: string) {
    return this.outputUpdateItemValue.emit({id, value});
  }
}
