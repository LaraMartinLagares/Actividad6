import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtomsBarComponent } from '../buttoms-bar/buttoms-bar.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtomsBarComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() myUser!: IUser

}
