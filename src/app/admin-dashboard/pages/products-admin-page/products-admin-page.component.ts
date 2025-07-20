import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { ProductTableComponent } from "src/app/product/product-table/product-table.component";
import { ProductsService } from 'src/app/product/services/products.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsAdminPageComponent {

   productsService = inject(ProductsService);
   paginationService = inject(PaginationService);

   productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({ 
      page: this.paginationService.currentPage()-1,
      limit: this.productsPerPage()
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
        limit:params.limit
      });
    },
  });

 }
