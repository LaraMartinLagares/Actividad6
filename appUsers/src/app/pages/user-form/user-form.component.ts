import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  titleForm: string = 'NUEVO USUARIO';

  textBoton: string = 'Guardar'

  userService = inject(UsersService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({      
      first_name: new FormControl('',[
        Validators.required,
      ]),
      last_name: new FormControl('',[
        Validators.required,
      ]),
      email: new FormControl('',[
        Validators.required,
        this.emailValidator
      ]),
      image: new FormControl('',[
        Validators.required,
        this.imageValidator
      ]),
    }, [])
  }

  async getDataForm(): Promise<any> {
    
    if(this.userForm.value._id){
      try{
        const response = await this.userService.update(this.userForm.value);
        console.log(response)
        if(response.id){
          this.successMessage(response, 'actualizado');
          this.router.navigate(['/home']);
        }else{
          this.errorMessage();
        }
      }catch(err){
        this.errorMessage();
      }
    }else{
      try{
        const response = await this.userService.insert(this.userForm.value);
        console.log(response);
        if(response.id) {
          this.successMessage(response, 'añadido');
          this.router.navigate(['/home']);
        }else{
          this.errorMessage();
        }
      }catch(err){
        this.errorMessage();
      }
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any)=>{
      if(params._id) { 
        this.titleForm ='ACTUALIZAR USUARIO';
        this.textBoton = 'Actualizar'
        const response = await this.userService.getById(params._id);
        this.userForm = new FormGroup({   
          _id: new FormControl(response._id, []),   
          first_name: new FormControl(response.first_name,[
            Validators.required,
          ]),
          last_name: new FormControl(response.last_name,[
            Validators.required,
          ]),
          email: new FormControl(response.email,[
            Validators.required,
            this.emailValidator
          ]),
          image: new FormControl(response.image,[
            Validators.required,
            this.imageValidator
          ])
        }, [])
      }

    })
  }
  
  emailValidator(controlName: AbstractControl): any {
    const email = controlName.value;
    const patronEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return (!patronEmail.test(email)) ? {'emailvalidacion': 'Formato email no válido'} : null; 
  }

  imageValidator(controlName: AbstractControl): any {
    const url = controlName.value;
    const patronUrl = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return (!patronUrl.test(url)) ? {'imagevalidacion': 'Formato url no válido'} : null; 
  }

  checkControl(formControlName: string, validator: string): boolean | undefined{

    console.log(this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched)
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched
  }

  errorMessage(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Lo sentimos, se ha producido un error. Por favor, vuelva a intentarlo.",
    });
  }

  successMessage(user: IUser, option: string): void {
    Swal.fire(`Usuario ${user.first_name} ${user.last_name} ha sido ${option} correctamente`);
  }

} 