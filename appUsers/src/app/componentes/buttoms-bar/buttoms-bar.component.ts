import { Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

