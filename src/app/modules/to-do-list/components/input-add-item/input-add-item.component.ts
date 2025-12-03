import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";

// Interfaces
import { IListItems } from '../../interfaces/IListItems.interface';


@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  private cdr = inject(ChangeDetectorRef);
  @Output() public outputAddListItems = new EventEmitter<IListItems>();
  @ViewChild("inputText") public inputText!: ElementRef;
  @Input({ required: true }) public inputListItems: IListItems[] = [];

  public focusAndAddItem(value: string) {
    if (value) {
      this.cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItems.emit({
        id,
        checked:  false,
        value
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
