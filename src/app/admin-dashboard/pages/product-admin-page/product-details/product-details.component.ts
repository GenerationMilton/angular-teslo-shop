import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from 'src/app/product/interfaces/product.interface';
import { ProductCarouselComponent } from "src/app/product/product-carousel/product-carousel.component";

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent { 
  product = input.required<Product>();

  sizes =['XS',"S","M","L","XL","XXL"];

}
