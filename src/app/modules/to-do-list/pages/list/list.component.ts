import { Component, signal } from '@angular/core';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

// Interfaces
import { IListItems } from '../../interfaces/IListItems.interface';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
[x: string]: any;

  private setListItems = signal<IListItems[]>(this.parseItems());
  public getListItems = this.setListItems.asReadonly();
  public addItem = signal<boolean>(true);

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem('@my-list', JSON.stringify([...this.setListItems(), value]));
    return this.setListItems.set(this.parseItems());
  }

  private parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.setListItems.set(this.parseItems());
  }
}
