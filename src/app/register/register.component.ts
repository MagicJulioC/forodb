import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email =""
  pass=""
  showError = false
  showLoading=false
  showConfirm = false
  constructor(private router: Router,private api:ApiRestService){}
  register(){
    this.api.register(this.email,this.pass).subscribe({
      next:respuesta =>{
        this.showConfirm = true
        this.router.navigate(['/login'])
      },
      error:errores =>{
        this.showError=true
        this.showLoading=false
      }
    })
  }
}
