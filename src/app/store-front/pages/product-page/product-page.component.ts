import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/product/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent {
  //rxResource
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params:() => ({idSlug: this.productIdSlug}),
    stream:({params}) =>{
      return this.productService.getProductByIdSlug(params.idSlug);
    },
  })
 }
