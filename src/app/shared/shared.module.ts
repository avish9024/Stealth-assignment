import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/popups/add-product/add-product.component';
import { FilterPipe } from './pipes/filter.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';


@NgModule({
  declarations: [AddProductComponent, FilterPipe],
  imports: [
    PickerModule,
    EmojiModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddProductComponent, PickerModule, EmojiModule, FilterPipe],
})
export class SharedModule { }
