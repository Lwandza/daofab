import { AfterViewInit, Component, ViewChild } from '@angular/core';
import parent from '../../data/Parent.json'
import child from '../../data/Child.json'
import { Router } from '@angular/router'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ParentElement } from '../parent-element';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

const parentList: ParentElement[]=parent.data;

export interface ChildElement {
  id: number;
  parentId: number;
  paidAmount: number;

}
var tableList = parent.data
const childList: ChildElement[]=child.data
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class HomeComponent implements AfterViewInit{
  dataSource= new MatTableDataSource<ParentElement>(parent.data)
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
  constructor(private router: Router) {}
  displayedColumns: string[] = ['id', 'sender', 'receiver', 'totalAmount','totalReceived'];
  projectList = parentList.map(items=>{
    if(items.id !=null){
      var totalrec= childList.filter(item=>{
        return item.parentId==items.id
      }).map(total=>total.paidAmount).reduce((acc, value) => acc + value, 0)
      items.totalReceived=totalrec
      return items

    }
    else{
      return null
    }
  })
  // dataSource = tableList;

  // rowClicked(id:number):void {
     hi =console.log(parent.data)

  //   this.router.navigate(['transaction',id])
  // }
  rowClicked(id:number, sender:string, receiver:string, totalAmount:number):void {
    console.log(id)
    console.log(sender)
    // var projectId = row.id
    this.router.navigate(['transaction',id])
  }
}
