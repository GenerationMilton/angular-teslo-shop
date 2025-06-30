import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent { }
