//
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IItem } from '../item/item.module';
//
@Component({
  selector: 'app-itemadd',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbAlertModule],
  templateUrl: './itemadd.component.html',
  styleUrl: './itemadd.component.css',
})
export class ItemaddComponent {
  //
  itemAdd?: any;
  //
  constructor(
    private fb: FormBuilder,
    private _http: HttpClient,
  ) {}

  //
  ngOnInit(): void {
    this.itemAdd = this.fb.group({
      regnum: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      kms: ['', Validators.required],
      colour: ['', Validators.required],
      vin: ['', Validators.required],
      retail: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }
  //
  get regnum() { return this.itemAdd.get('regnum'); }
  get make() { return this.itemAdd.get('make'); }
  get model() { return this.itemAdd.get('model'); }
  get year() { return this.itemAdd.get('year'); }
  get kms() { return this.itemAdd.get('kms'); }
  get colour() { return this.itemAdd.get('colour'); }
  get vin() { return this.itemAdd.get('vin'); }
  get retail() { return this.itemAdd.get('retail'); }
  get cost() { return this.itemAdd.get('cost'); }
  //
  onSubmit(): void {
    if(this.itemAdd.valid) {
      try {
        this._http.post('/api/item', this.itemAdd.value)
          .subscribe((res) => {
            console.log("RES", res);
          });
      } catch (e) {
        console.log("HTTP ERROR",e);
      }
    }
  }
}
