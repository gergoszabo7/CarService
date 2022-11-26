import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './serives/api.service';
import { MaintdialComponent } from './maintdial/maintdial.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CarService';
  carList:any = [];
  maintList:any = [];
  maintNames = ["Oil change","Brake change","Sparkplugs","Tyres","Gears","Coolant change","Air filter","Transmission fluid","Batteries","Timing belt/chain"];
  
  constructor(private dialog: MatDialog,private maintDialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllCars();
    this.getAllMaints();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    })
  }

  openMaintDialog(carID:number){
    this.maintDialog.open(MaintdialComponent, {
      width: '30%',
      data: {
        id: carID
      }
    })
  }

  getAllCars(){
    this.api.getCar()
    .subscribe({
      next:(res)=>{
        this.carList=res;
      },
      error:(err)=>{
        alert("Error fetching the records");
      }
    })
  }

  getAllMaints(){
    this.api.getMaint()
    .subscribe({
      next:(res)=>{
        this.maintList=res;
      },
      error:(err)=>{
        alert("Error fetching the records");
      }
    })
  }

  getAvgDist(selID:number,selName:string){
    let sum = 0;
    let count = 0;
    this.maintList.forEach(function (item: any) {
      if (selID==item.carID && selName==item.name){
        sum = sum+(+item.distance);
        count++;
      }
    });
    return Math.floor(sum/count);
  }

  getAvgCost(selID:number,selName:string){
    let sum = 0;
    let count = 0;
    this.maintList.forEach(function (item: any) {
      if (selID==item.carID && selName==item.name){
        sum = sum+(+item.cost);
        count++;
      }
    });
    return Math.floor(sum/count);
  }
}
