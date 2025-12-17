import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarColor } from '../star-color';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelectOption, IonSelect } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonSelectOption, IonSelect],
})
export class Tab2Page {

  constructor(private starColor: StarColor) {}

  sColor = this.starColor.getColor();

  onColorChange(event: any) {
    
    const selectedColor = event.detail.value;
    console.log('Star color changed to on tab2: ', selectedColor);
    this.starColor.setColor(selectedColor);
    this.sColor = selectedColor;
  }

}
