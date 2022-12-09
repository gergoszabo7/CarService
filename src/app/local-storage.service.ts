import { NotExpr } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnInit {
  private readonly update$ = new Subject<void>();
  private storage$!: Observable<IDBDatabase>;
  public cars$!: Observable<Car[]>;

  constructor() { }

  ngOnInit(): void {
    this.init();
    this.updateData();
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
    db.createObjectStore("cars", {keyPath: "id"});
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

add(){
  const brand= (<HTMLInputElement>document.getElementById("brand")).value;
  const model= (<HTMLInputElement>document.getElementById("model")).value;
  console.log(brand + " " + model);

  this.storage$
      .pipe(
        switchMap(
          (db) =>
            new Observable((observer) => {
              let transaction = db.transaction("cars", "readwrite");
              transaction.objectStore("cars").add({ brand: brand, model: model, id: brand+model});
              transaction.oncomplete = () => {
                transaction != null;
                this.update$.next();
                observer.complete();
              };
              return () => transaction?.abort();
            })
        )
      )
      .subscribe();
  
}

/*get(){

  return new Promise(async(resolve,reject)=>{
    if(this.storage$ != undefined){
      const request = await this.storage$.transaction([this.storage$],"readwrite")
    .objectStore(this.storage$).get();

    request.onsuccess = await function(event: any){
      if(event.target.result){
        console.log("sucess");
        resolve("sucess");
      } else {
        console.log("error);")
        resolve(false);
      }
    }
  }
  })

}*/

/*getCars(){
  this.storage$
  .pipe(switchMap(
    (db)=>
      new Observable((observer)=>{
        const transaction = db.transaction(["cars"], "readwrite");
        observer.next();
        observer.complete();
      }
      )
  )).subscribe
}*/

delete(){

}

}
