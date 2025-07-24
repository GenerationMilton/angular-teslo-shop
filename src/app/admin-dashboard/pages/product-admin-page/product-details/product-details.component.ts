import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { Product } from 'src/app/product/interfaces/product.interface';
import { ProductCarouselComponent } from "src/app/product/product-carousel/product-carousel.component";
import { FormErrorLabelComponent } from "@shared/components/pagination/form-error-label/form-error-label.component";
import { ProductsService } from 'src/app/product/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
//import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {



  product = input.required<Product>();

  //injection service
  productService = inject(ProductsService);

  //reactive form
  fb = inject(FormBuilder);

  //router para navegación
  router=inject(Router);

  //signal to save products and show modal
  wasSaved = signal(false);

  //temp images to show preview images
  imageFileList: FileList | undefined = undefined;
  tempImages = signal<String[]>([]);

  productForm= this.fb.group({
    title:['',Validators.required],
    description: ['', Validators.required],
    slug: ['',[Validators.required, Validators.pattern(FormUtils.slugPattern)]
    ],
    price:[0, [Validators.required, Validators.min(0)]], 
    stock:[0, [Validators.required, Validators.min(0)]], 
    sizes:[['']], 
    images: [[]],
    tags:[''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ]
  })

  sizes =['XS',"S","M","L","XL","XXL"];

    ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>){
    this.productForm.reset(this.product()as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',')});
    //this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string){

    const currentSizes = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size),1);
    } else {
      currentSizes.push(size);
    }
    
    this.productForm.patchValue({ sizes: currentSizes});

  }

  async onSubmit() {
    const isValid= this.productForm.valid;
    this.productForm.markAllAsTouched();

    if(!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
      formValue.tags
        ?.toLowerCase()
        .split(',')
        .map((tags)=> tags.trim()) ?? [],
    };

    if(this.product().id === 'new'){
      //crear producto //firstvalue from recibe un observable y recibe una promesa
      const product = await firstValueFrom(
        this.productService.createProduct(productLike)

      );
      console.log('Producto creado');
      this.router.navigate(['/admin/products', product.id]);
      
    } else {
      const product = await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike)
      )

    }

    //timeout to remove the modal
    this.wasSaved.set(true);
    setTimeout(()=>{
      this.wasSaved.set(false);
    }, 3000);
  } 

  //Images
  onFilesChanged(event: Event) {
  const fileList = (event.target as HTMLInputElement).files;
  this.imageFileList = fileList ?? undefined;

  this.tempImages.set([]);

  const imageUrls = Array.from(fileList ?? []).map((file)=>
  URL.createObjectURL(file)
  );

  this.tempImages.set(imageUrls)
  
}



}
