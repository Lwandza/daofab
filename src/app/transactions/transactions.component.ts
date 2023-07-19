import { Component, OnDestroy } from '@angular/core';
import child from '../../data/Child.json'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Router, ActivatedRoute  } from '@angular/router'
import { ParentElement } from '../parent-element';
import parent from '../../data/Parent.json'

export interface ChildElement {
  id: number;
  parentId: number;
  paidAmount: number;
  sender: string;
  receiver: string;
  totalAmount: string;
}
var transactionId =''
const childList: ChildElement[]=child.data
const parentList: ParentElement[]=parent.data;
var sender =''
var receiver=''
var totalAmount=''


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnDestroy {

  constructor(private route: ActivatedRoute,  private router: Router ) {}

  //  navigation = this.router.getCurrentNavigation();
  // navigation =JSON.parse(this.route.params.subscribe(params =>{}));

 
  ngOnInit(){
  
    console.log('hi')
    
    let navigation = this.route.params.subscribe(params=>{
      // console.log(params['id'])
      transactionId= params['id']

    })
    console.log("trans",transactionId)
  }
    displayedColumnsChild: string[] = ['id','sender', 'receiver', 'totalAmount', 'paidAmount'];
    transactionDetails = parentList.filter(items=>{
      if(items.id.toString()==transactionId){
        sender=items.sender
        receiver=items.receiver
        totalAmount= items.totalAmount.toString()
        return items
      }
      else{
        return null
      }
     })
     transactionList = childList.filter(items=>{
   if(items.parentId.toString()==transactionId){
      items.sender=sender
      items.receiver=receiver
      items.totalAmount=totalAmount
    return items
   }
   else{
    return null
   }
  })
  
//  if(this.transactionList!=null){
  childDataSource = this.transactionList;
//  }
  ngOnDestroy() {
   this.transactionList=[]
   console.log('destroy')
  }
}
