import { Component, Input, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtomDeleteComponent } from '../buttom-delete/buttom-delete.component';

@Component({
  selector: 'app-buttoms-bar',
  standalone: true,
  imports: [RouterLink, ButtomDeleteComponent],
  templateUrl: './buttoms-bar.component.html',
  styleUrl: './buttoms-bar.component.css'
})
export class ButtomsBarComponent {

  @Input() user!: IUser;
  @Input() parent: string = "";
  @Input() textDelete: string = "";

}

