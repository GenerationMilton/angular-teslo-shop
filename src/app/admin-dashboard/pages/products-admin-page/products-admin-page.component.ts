import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductTableComponent } from "src/app/product/product-table/product-table.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, ProductTableComponent],
  templateUrl: './products-admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsAdminPageComponent { }
