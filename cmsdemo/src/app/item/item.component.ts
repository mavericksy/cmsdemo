//
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  itemDetail? : any;
  //
  constructor(private route : ActivatedRoute, private itemService : ItemService){}
  //
  ngOnInit(): void {
    let itemID = this.route.snapshot.params['id'];
    this.getItemDetailByID(itemID);
  }
  //
  getItemDetailByID(id: number) {
    this.itemService.getItemDetailById(id).subscribe(res => {
      this.itemDetail = res;
    })
  }
}
