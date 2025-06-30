
import { ChangeDetectionStrategy, Component } from '@angular/core';
//import { ProductCardComponent } from "../../../product/components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
