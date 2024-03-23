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
  algoCategories = [{label:'Nearest Neighbor', value: 'nearestNeighbor'}, {label:'Nearest Neighbor of Five', value: 'nearestNeighborOfFive'}]
  selectedCat = 100;
  selectedAlgo = 'nearestNeighbor';

  data: string[][] = [];
  triangularMat: number[][] = [];
  symmetricMat: number[][] = [];
  recordedRoutes : Buffer[] = [];

  constructor(private httpClient: HttpClient) {
    this.init();
  }
    

  run() {
    this.clear();

    switch (this.selectedAlgo) {
      case 'nearestNeighbor':
        this.dataSoruceSub.next(this.nearestNeighbor());
        break;

      case 'nearestNeighborOfFive':
        this.dataSoruceSub.next(this.nearestNeighborOfFive());
        break;
    }
  }

  /** Picks the nearest shortest route. */
  nearestNeighbor() {
    const symmetricMatTemp = this.symmetricMat;
    let recordedRoutes : Buffer[] = [];
    let buffer :Buffer = new Buffer(0, 0, 0, 0);
    symmetricMatTemp.forEach((m, i) => {
        buffer.value = Math.min(...m.filter((prev) => !recordedRoutes.slice(0, recordedRoutes.length).map((buffer) => buffer.value).includes(prev)));
        buffer.index = m.indexOf(buffer.value);
        recordedRoutes.push(new Buffer(buffer.value, buffer.index, 0, i));
        const total = recordedRoutes.map((x) => x.value).reduce((total, value) => total + value, 0);
        recordedRoutes[recordedRoutes.length -1].total = total;
        this.swap(symmetricMatTemp, i, recordedRoutes.length -1);
    })
    this.symmetricMatSub.next(this.symmetricMat.map((ar) => ar.map((value, i) => `(${i} - ${value})`).toString().replace(/\,/gi, ' '))); 
    return recordedRoutes;
  }

  /** Calculates the shortest route based on specific number of nodes */
  nearestNeighbors(symmetricMat: number[][], recordedRoutes: Buffer[] = [],  initVal?: number) {
    let buffer :Buffer = new Buffer(0, 0, 0, 0);
    symmetricMat.forEach((m, i) => {
      if (initVal && i == 0) {
        buffer.value = initVal;
      } else {
        buffer.value = Math.min(...m.filter((prev) => !recordedRoutes.slice(0, recordedRoutes.length).map((buffer) => buffer.value).includes(prev)));
      }
        buffer.index = m.indexOf(buffer.value);
        recordedRoutes.push(new Buffer(buffer.value, buffer.index, 0, recordedRoutes.length+1));
        const total = recordedRoutes.map((x) => x.value).reduce((total, value) => total + value, 0);
        recordedRoutes[recordedRoutes.length -1].total = total;
        this.swap(symmetricMat, i, recordedRoutes.length -1);
    })
    this.symmetricMatSub.next(this.symmetricMat.map((ar) => ar.map((value, i) => `(${i} - ${value})`).toString().replace(/\,/gi, ' '))); 
    return recordedRoutes;
  }

  /** Picks the shortest path based on the next 5 nodes*/
  nearestNeighborOfFive() {
    const symmetricMat = this.symmetricMat;
    let recordedRoutes : Buffer[] = [];
    let totalNodes: {city: number; total: number}[] = [];
    let initVal: number;
    let window: number[][]= [];
    for (let i = 0; i < symmetricMat.length; i+=5) {
      this.symmetricMat[i].slice(i ==0 ? i : i+1, symmetricMat.length).forEach((value) => {
         window = symmetricMat.slice(i, i+5);
        const nearestFive = this.nearestNeighbors([...window], [] ,value);
        totalNodes.push({city: nearestFive[0].value , total: nearestFive[nearestFive.length-1].total});
       })
       let totals = totalNodes.map((val) => val.total);
       initVal = totalNodes[totals.indexOf(Math.min(...totals))].city;
       totalNodes = [];
       this.nearestNeighbors([...window], recordedRoutes, initVal);
    }

    this.symmetricMatSub.next(this.symmetricMat.map((ar) => ar.map((value, i) => `(${i} - ${value})`).toString().replace(/\,/gi, ' '))); 
    return recordedRoutes;
  }

  /** Swaps the picked node with current node. */
  swap(symmetricMat: number[][], index: number, location: number) {
        symmetricMat.splice(index, 1, symmetricMat[location])
  }
  

  /** Sets up the matrices */
  init() {
    this.data = [];
    this.triangularMat= [];
    this.symmetricMat= [];
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
      this.symmetricMatSub.next(this.symmetricMat.map((ar) => ar.map((value, i) => `(${i} - ${value})`).toString().replace(/\,/gi, ' '))); 
       });
  }

  clear() {
    this.recordedRoutes = [];

      this.dataSoruceSub.next(this.recordedRoutes);
    
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