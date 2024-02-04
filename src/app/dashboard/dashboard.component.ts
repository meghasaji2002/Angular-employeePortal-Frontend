import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  showSideBar:boolean=true
  employeeCount:Number=0

  adminName:any=""
  adminDetails:any={}

  selected: Date | null=new Date()

  profileImage:string='./assets/images/userProfile.png'
  EditAdminStatus:boolean=false
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};

  constructor(private api:AdminapiService){
    this.chartOptions={
      
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Employee status'
  },
  tooltip: {
      valueSuffix: '%'
  },
  // subtitle: {
  //     text:
  //     'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
  // },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  credits:{
    enabled:false
  },
  series: [
      {
          name: 'Project',
          colorByPoint: true,
          data: [
              {
                  name: 'active',
                  y: 55.02
              },
              {
                  name: 'average',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'inactive',
                  y: 1.09
              },
              {
                  name: 'edge',
                  y: 15.5
              },
              {
                  name: 'opera',
                  y: 1.68
              }
          ]
      }
  ]

    }
    HC_exporting(Highcharts);
  }

  ngOnInit():void {

  if(localStorage.getItem("name")){
    this.adminName = localStorage.getItem("name")
  }

  this.totalEmployee()

    //fetch all admin details
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
    })


  }

  menuBar(){
    this.showSideBar=!this.showSideBar
    
  }

  totalEmployee(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount =res.length
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  edit(){
    this.EditAdminStatus=true
  }

  getFile(event:any){
    let fileDetail=event.target.files[0]
    console.log(fileDetail);
    //create an object for fileReader() classes. it is used to convert the file into url
    let fr = new FileReader()
    //to read
    fr.readAsDataURL(fileDetail)
    //to convert
    fr.onload=(event:any)=>{
      // console.log(event.target.result);
      this.profileImage=event.target.result
      this.adminDetails.picture = this.profileImage
        }
    
  }

  updateAdmin(){
    this.api.updateAdminapi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "wow",
          text:"admin details updated successfully"
         
        });
        localStorage.setItem("name",res.name)
        localStorage.setItem("password",res.password)
        this.adminName=localStorage.getItem("name")
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancel(){
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
      this.EditAdminStatus=false
    })
  }

}
