import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './serives/api.service';
import { MaintdialComponent } from './maintdial/maintdial.component';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Car } from './car.model';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { LocalStorageService } from './local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private readonly update$ = new Subject<void>();
  private storage$!: Observable<IDBDatabase>;
  public cars$!: Observable<Car[]>;

  title = 'CarService';
  carList:any = [];
  maintList:any = [];
  maintNames = ["Oil change","Brake change","Sparkplugs","Tyres","Gears","Coolant change","Air filter","Transmission fluid","Batteries","Timing belt/chain"];
  
  constructor(private dialog: MatDialog,private maintDialog: MatDialog, private api: ApiService, private localstore: LocalStorageService){
  }

  ngOnInit(): void {
    this.getAllCars();
    this.getAllMaints();
    this.init();
    this.updateData();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      maxWidth: '100%',
      minWidth: '40%',
    })
  }

  openMaintDialog(carID:number){
    this.maintDialog.open(MaintdialComponent, {
      maxWidth: '100%',
      minWidth: '40%',
      data: {
        id: carID
      }
    })
  }

  private init(): void {
    this.storage$ = new Observable<IDBDatabase>((observer) => {
      const openRequest = indexedDB.open("cars");
      openRequest.onupgradeneeded = () => this.createDb(openRequest.result);
      openRequest.onsuccess = () => {
        observer.next(openRequest.result);
        observer.complete();
      };
    });
  }

  private createDb(db: IDBDatabase): void {
    db.createObjectStore("cars", {keyPath: 'key', autoIncrement: true});
    console.log("create", db);
  }

  private updateData(): void {
    this.cars$ = this.update$.pipe(
      startWith(undefined),
      switchMap(() =>
        this.storage$.pipe(
          switchMap(
            (db) =>
              new Observable<Car[]>((observer) => {
                let transaction = db.transaction("cars");
                const request = transaction.objectStore("cars").getAll();
                transaction.oncomplete = () => {
                  transaction != null;
                  observer.next(request.result as Car[]);
                  observer.complete();
                };
              })
          )
        )
      )
    );
  }

  postSync(){
    
  }

  backgroundSync(){
    navigator.serviceWorker.ready.then((swRegistration:any)=> swRegistration.sync.register('post-data')
    ).catch(console.log);
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
