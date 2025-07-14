
import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, signal } from '@angular/core';
import { ProductCardComponent } from 'src/app/product/components/product-card/product-card.component';
import { ProductsService } from 'src/app/product/services/products.service';
//import { ProductCardComponent } from "../../../product/components/product-card/product-card.component";
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productsService.getProducts({});
    },
  });
}