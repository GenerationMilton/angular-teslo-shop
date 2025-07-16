
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from 'src/app/product/components/product-card/product-card.component';
import { ProductsService } from 'src/app/product/services/products.service';
//import { ProductCardComponent } from "../../../product/components/product-card/product-card.component";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((params) => params.get('page')? +params.get('page')!: 1),
  //     map( page =>(isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue:1,
  //   }
  // )

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage()-1}),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
      });
    },
  });
}