import { Component, Input, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-buttom-delete',
  standalone: true,
  imports: [],
  templateUrl: './buttom-delete.component.html',
  styleUrl: './buttom-delete.component.css'
})
export class ButtomDeleteComponent {

  @Input() textbutton! : string; 
  @Input() unUser! : IUser;

  userService = inject(UsersService);

  router = inject(Router);

  mensajeConfirmacion() : void {

    Swal.fire({
      title: `Deseas borrar al usuario ${this.unUser.first_name} ${this.unUser.last_name}`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          let response = await this.userService.delete(this.unUser._id);
          if (response._id){
            this.successMessage(response);
            this.router.navigate(['/home']);
          }else{
            this.errorMessage();
          }
        }catch(err){
          this.errorMessage();
        }
      }
    })

  }

  errorMessage(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Lo sentimos, se ha producido un error. Por favor, vuelva a intentarlo.",
    });
  }

  successMessage(response: IUser): void {
    Swal.fire({
      title: "Eliminado!",
      text: `El usuario ${response.first_name} ${response.last_name} ha sido borrado`,
      icon: "success"
    });
  }

}

