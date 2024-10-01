//
import { Component } from '@angular/core';
import { AppItems } from '../items/items.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-authed',
  standalone: true,
  imports: [AppItems],
  providers: [DecimalPipe],
  templateUrl: './authed.component.html',
  styleUrl: './authed.component.css'
})
export class AuthedComponent {

}
