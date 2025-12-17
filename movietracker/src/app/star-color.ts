import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarColor {
  color: string = 'gold';

  constructor() {}

  getColor(): string {
    console.log('Star color requested from service: ', this.color);
    return this.color;
  }

  setColor(color: string): void {
    console.log('Star color set from: ', this.color, ' to: ', color, ' in service');
    this.color = color;
  }
}
