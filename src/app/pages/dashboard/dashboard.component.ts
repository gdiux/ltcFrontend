import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(  private productsService: ProductsService) { }

  ngOnInit(): void {

    this.loadProximos();
  }

  /* ============================================================================ 
  LOAD PROXIMOS
  ============================================================================ */
  public products: Product[] = [];
  public totalProximos: number = 0;
  public inProduct: any;
  loadProximos(){

    let query = `tipo=proximos&status=true&preventivo=false`;
    this.productsService.loadProducts(0, 100, query)
        .subscribe(({ products, total }) =>{

          this.products = products;
          this.totalProximos = total;

          this.inProduct = products[0];
          this.crt = true;
          

        });
  }

  /* ============================================================================ 
  CREATE PREVENTIVE
  ============================================================================ */
  public crt: boolean = false;
  createPrev(product: any){
    this.inProduct = product;
    this.crt = true;
  }

  // FIN DE LA CLASE
}
