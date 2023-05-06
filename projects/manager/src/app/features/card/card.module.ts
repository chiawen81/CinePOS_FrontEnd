import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardContentComponent } from './card-content.component';
import { CardHeaderComponent } from './card-header.component';



@NgModule({
  declarations: [
    CardComponent,
    CardContentComponent,
    CardHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardComponent,
    CardContentComponent,
    CardHeaderComponent
  ]
})
export class CardModule { }
