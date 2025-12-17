import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { StarColor } from '../star-color';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  imports: [CommonModule, IonIcon],
})
export class StarsComponent{

  constructor(public starColor: StarColor) { }

  rating = input<number>(0);

  stars = [1, 2, 3, 4, 5];
}
