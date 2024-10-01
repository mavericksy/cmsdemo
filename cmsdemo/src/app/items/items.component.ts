//
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { IItem } from '../item/item.module';
import { ItemService } from '../services/item.service';
import { NgbdSortableHeader, SortEvent } from '../item/sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, RouterLink, RouterLinkActive],
  providers: [ItemService, DecimalPipe],
})
export class AppItems {
  //
  itemData$: Observable<IItem[]>;
  total$: Observable<number>;
  //
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  //
  constructor(public itemService : ItemService){
    this.itemData$ = this.itemService.items$;
    this.total$ = this.itemService.total$;
  }
  //
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header: any) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.itemService.sortColumn = column;
    this.itemService.sortDirection = direction;
  }
}
