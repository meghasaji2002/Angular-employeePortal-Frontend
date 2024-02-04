import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../employee.model';
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  //OnInIt is an interface to implement ngOnInIt

   allEmployee:employeeModel[]=[]

   //for pagination
   p: number = 1;

   searchKey:string=""

    constructor(private api:AdminapiService){}
    //lifeCycle hook - call just after the component is created and constructor is called

    ngOnInit(): void {
      this.allEmployeeDetails()
    }

    allEmployeeDetails(){
      this.api.getAllEmployeeApi().subscribe({
        next:(res:any)=>{
          this.allEmployee = res 
          console.log(this.allEmployee);
          
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    removeEmployee(id:any){
      this.api.deleteEmployeeApi(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.allEmployeeDetails()
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    sortId(){
      this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
    }
    sortName(){
      this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
    }

    generatePdf(){
      // create an object for jspdf
      const pdf = new jsPDF()

      let head=[['id','Employee name','Email','Status']]

      let body:any=[]
      this.allEmployee.filter((item)=>item.id!=='1').forEach((item)=>{body.push([item.id,item.name,item.email,item.status])})

      //fontsize
      pdf.setFontSize(16)
      //title
      pdf.text('Employee Details',10,10)
      //table
      autoTable(pdf,{head:head,body:body})
      //to open in a new tab
      pdf.output('dataurlnewwindow')
      //savw and download
      pdf.save('employee.pdf')

    }
}
