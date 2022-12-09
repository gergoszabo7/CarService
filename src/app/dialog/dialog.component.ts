import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../serives/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  carForm !: FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>, public LocalStorage:LocalStorageService){}

  ngOnInit(): void {
    this.LocalStorage.ngOnInit();
    this.carForm = this.formBuilder.group({
      brand: ['',Validators.required],
      model: ['',Validators.required]
    })
  }

  addCar(){
    if(this.carForm.valid){
      this.api.postCar(this.carForm.value)
      .subscribe({
        next:(res)=>{
          alert("New car added");
          this.carForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error adding the car");
        }
      })
    }
  }

  addIdx(){
    this.LocalStorage.add();
  }

}
