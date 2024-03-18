import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtomsBarComponent } from '../../componentes/buttoms-bar/buttoms-bar.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [ButtomsBarComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})

export class UserViewComponent {

  activatedRoute = inject(ActivatedRoute);

  userService = inject(UsersService);

  myUser!: IUser;

  router = inject(Router)

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params:any)=>{
    const id = params._id  
    try{
      const response = await this.userService.getById(id);
      if(response._id){
        this.myUser = response;
      }else{
        this.router.navigate(['/error']);
      }
    }catch(err){
      this.router.navigate(['/error']);
    }
    })
  }
}

