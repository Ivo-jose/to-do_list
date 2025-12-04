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

  public listItemsStage(stage: 'pending' | 'completed') : IListItems[] {
    return this.getListItems().filter((item : IListItems) => {
      if (stage === 'pending') return !item.checked;
      if (stage === 'completed') return item.checked;
      return item
    });
  }

  public updateItemCheckbox(event: { id: string, checked: boolean }) {
    this.setListItems.update((oldValue: IListItems[]) => {
        oldValue.filter(res => {
          if (res.id === event.id) {
            res.checked = event.checked;
            return res;
          }
          return res;
        });
        return oldValue;
    });
    return localStorage.setItem('@my-list', JSON.stringify(this.setListItems()));
  }
}
