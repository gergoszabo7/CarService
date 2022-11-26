import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../serives/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-maintdial',
  templateUrl: './maintdial.component.html',
  styleUrls: ['./maintdial.component.css']
})
export class MaintdialComponent implements OnInit {

  maintForm !: FormGroup;
  carID = this.data.id;
  maintNames = ["Oil change","Brake change","Sparkplugs","Tyres","Gears","Coolant change","Air filter","Transmission fluid","Batteries","Timing belt/chain"];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<MaintdialComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}
  
  ngOnInit(): void {
    this.maintForm = this.formBuilder.group({
      name: ['',Validators.required],
      distance: ['',Validators.required],
      cost:['',Validators.required],
      carID : this.carID
    })
  }

  addMaint(){
    if(this.maintForm.valid){
      this.api.postMaint(this.maintForm.value)
      .subscribe({
        next:(res)=>{
          alert("New activity added");
          this.maintForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error adding the activity");
        }
      })
    }
  }

}
