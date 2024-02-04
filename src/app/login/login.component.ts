import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   email:string=""
   password:string=""

   constructor(private api:AdminapiService,private router:Router){}

   login(){
    if(!this.email || !this.password){
      swal.fire({
        icon: "info",
        title: "uh",
        text:"please fill the form completely"
       
      });
    }
    else{
     
      

      this.api.authorization().subscribe({
        next:(res:any)=>{
          const {email,password}= res;
          if(email==this.email && password==this.password){
              swal.fire({
              icon: "success",
              title: "wow",
              text:"login successfull"
             
            });
            this.api.updateData({d:true})

            // save admin name and password
            localStorage.setItem("name",res.name)
            localStorage.setItem("pswd",res.password)
            //navigate
            this.router.navigateByUrl('dashboard')
          }

          else{
             swal.fire({
              icon: "error",
              title: "oops",
              text:"Invalid email or password"
             
            });
          }
        },
        error:(res:any)=>{
          console.log(res);
          
        }
      })
    }
   }
}
