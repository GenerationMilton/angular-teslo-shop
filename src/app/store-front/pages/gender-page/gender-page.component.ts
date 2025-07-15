import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from 'src/app/product/services/products.service';
import { ProductCardComponent } from "src/app/product/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent { 

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

  
  productsResource = rxResource({
    params: () => ({ gender: this.gender()}),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
      });
    },
  });

}
