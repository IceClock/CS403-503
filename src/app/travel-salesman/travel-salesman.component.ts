import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-travel-salesman',
  templateUrl: './travel-salesman.component.html',
  styleUrls: ['./travel-salesman.component.css']
})
export class TravelSalesmanComponent {

  displayedColumns: string[] = ['route', 'value', 'index', 'total'];
  panelOpenState= false;
  dataSoruceSub = new Subject<Buffer[]>()
  symmetricMatSub = new Subject<string[]>()
  symmetricMat$ = this.symmetricMatSub.asObservable();
  dataSource$ = this.dataSoruceSub.asObservable();
  testCategories = [100, 1000];
  selectedCat = 100;

  data: string[][] = [];
  triangularMat: number[][] = [];
  symmetricMat: number[][] = [];
  recordedRoutes : Buffer[] = [];
  buffer :Buffer = new Buffer(0, 0, 0, 0);

  constructor(private httpClient: HttpClient) {}
    

  run() {
    this.clear(true);
    this.httpClient.get(`assets/Size${this.selectedCat}.graph`, {responseType: 'text'})
    .subscribe(data => {
      data.split('\n').forEach((x) => {
        this.data.push(x.split(' '));
      });
      this.data = this.data.filter((x) => x[0] !== '');
      this.triangularMat = this.data.map((x) => x.map((y => +y)));

      this.triangularMat.forEach((row, index) => {
        let col = this.getCol(this.triangularMat, index, row);
        this.symmetricMat.push(col);
      });
      this.symmetricMatSub.next(this.symmetricMat.map((ar) => ar.toString().replace(/\,/gi, '  ')));
      this.symmetricMat.forEach((m, i) => {
        if (i == 0 ) {
          this.recordedRoutes.push(new Buffer(0, 0, 0, 0));
        } else {
          this.buffer.value = Math.min(...m.filter((x) => x !== 0));
          this.buffer.index = m.indexOf(this.buffer.value);
          const total = this.recordedRoutes.map((x) => x.value).reduce((total, value) => total + value, 0);
          this.recordedRoutes.push(new Buffer(this.buffer.value, this.buffer.index, total, i));
        }
      })
      this.dataSoruceSub.next(this.recordedRoutes);
    });
  }

  clear(run = false) {
    this.data = [];
    this.triangularMat= [];
    this.symmetricMat= [];
    this.recordedRoutes = [];
    this.buffer = new Buffer(0, 0, 0, 0);
    if (!run) {
      this.dataSoruceSub.next(this.recordedRoutes);
    }
  }

  getCol(arr: number[][], n:number, row: number[]) {
  return arr.map(x => x[n]).map((y, index) => {
    if (y == undefined) {
      return row[index]
    }
    return y
  });
  }


}

class Buffer {
   route: number
   value: number; 
   index: number;
   total: number;

   constructor(value: number, index: number, total: number, route: number) {
    this.value = value;
    this.index = index;
    this.total = total;
    this.route = route;
   }
  }