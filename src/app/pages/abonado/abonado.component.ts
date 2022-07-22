import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AbonadosService } from '../../services/abonados.service';
import { Abonado } from 'src/app/models/abonado.model';

@Component({
  selector: 'app-abonado',
  templateUrl: './abonado.component.html',
  styles: [
  ]
})
export class AbonadoComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private abonadosService: AbonadosService,
                private router: Router,
                private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => {
          
          if (id) {
            this.loadAbonado(id);
          }else{

            this.router.navigateByUrl('/');

          }
          
        });

  }

  /** ================================================================
   *  CARGAR USUARIO
  ==================================================================== */
  public abonado!: Abonado;

  loadAbonado(id:string){

    this.abonadosService.loadAbonadoId(id)
        .subscribe( ({abonado}) => {

          this.abonado = abonado;

        }, (err) => {
          console.log(err);
          Swal.fire('Erro', err.error.msg, 'error');
          this.router.navigateByUrl('/');
          
        });

  }


  // FIN DE LA CLASE
}
