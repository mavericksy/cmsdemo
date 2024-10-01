//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../item/sortable.directive';
//
import { IItem } from '../item/item.module';
//
interface SearchResult {
  items: IItem[];
  total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(items: IItem[], column: SortColumn, direction: string): IItem[] {
  if (direction === '' || column === '') {
    return items;
  } else {
    return [...items].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: IItem, term: string, pipe: PipeTransform) {
  return (
    item.make.toLowerCase().includes(term.toLowerCase()) ||
    item.model.toLowerCase().includes(term.toLowerCase()) ||
    item.year.toLowerCase().includes(term.toLowerCase()) ||
    item.regnum.toLowerCase().includes(term.toLowerCase()) ||
    item.vin.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  //
  private apiUrl = '/api';
  private authSecretKey = 'Bearer Token';

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _items$ = new BehaviorSubject<IItem[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this.getItems().subscribe((res)=>{
      this._search$
        .pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search(res)),
          tap(() => this._loading$.next(false)),
        )
        .subscribe((result) => {
          this._items$.next(result.items);
          this._total$.next(result.total);
        });
      this._search$.next();
    })
  }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getItems() : Observable<IItem[]>{
    const headers = this.getHeaders();
    return this.http.get<IItem[]>(`${this.apiUrl}/items`, { headers });
  }

  getItemDetailById(id : number): Observable<IItem>{
    const headers = this.getHeaders();
    return this.http.get<IItem>(`${this.apiUrl}/item/` + id, { headers })
  }
  //
  get items$() {
    return this._items$.asObservable();
  }
  //
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(arr: IItem[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    let items = sort(arr, sortColumn, sortDirection);
    items = items.filter((item) => matches(item, searchTerm, this.pipe));
    const total = items.length;
    items = items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ items, total });
  }
}
