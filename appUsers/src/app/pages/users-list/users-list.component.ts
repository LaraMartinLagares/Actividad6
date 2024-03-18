import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../componentes/user-card/user-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  userService = inject(UsersService);

  totalPages! : number;
  currentPage: number = 1;

  arrUsers : IUser[][] =[]; //arrUsers es un array de arrays de user (un elemento por página)

  router = inject(Router);

  async ngOnInit(): Promise<any> {
    try{
      const response = await this.userService.getAll();
      this.totalPages = response.total_pages;
      if(response.results!==undefined){
        this.arrUsers.push(response.results);
      }
      for(let i: number = 2; i <= this.totalPages; i++){
        try{
          const response = (await this.userService.getPage(i)).results;
          if(response!==undefined){
            this.arrUsers.push(response) 
          } 
        }catch(err){
          this.router.navigate(['/error']); 
        }
      }
    }catch(err){
      this.router.navigate(['/error']);
    }
  }

  changePage(page: number, option: string): void {
    switch(option){
      case '+':
        if(this.currentPage+1<=this.totalPages){
          this.currentPage+=1;
        }
        break;
      case'-':
        if(this.currentPage-1>0){
          this.currentPage-=1;
        };
        break;
      default:
        this.currentPage = page;
    }
  }

}