import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [RouterLink, RouterLinkActive, SlicePipe],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent { 

  product = input.required<Product>();

  imageUrl = computed(()=>{
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  })

}
