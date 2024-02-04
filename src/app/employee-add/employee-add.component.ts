import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/adminapi.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  //variable to store the value from the input box which have the same structure 
  employee:employeeModel={}
  constructor(private api:AdminapiService,private router:Router){}

  cancelEmployee(){
    this.employee={}
  }
  addEmployee(){
    console.log(this.employee);
    this.api.addEmployeeApi(this.employee).subscribe({
      next:(res:employeeModel)=>{
        console.log(res);
      alert('added successfully')
         this.employee={}
         this.router.navigateByUrl('employee')

        // alert('added successfully')
        
      },
      error:(err:any)=>{
        console.log(err);
        
        
      }
    })
    
  }


}


