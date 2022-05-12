import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

// MODELS
import { Preventive } from 'src/app/models/preventives.model';

// SERVICES
import { PreventivesService } from '../../services/preventives.service';
import { SearchService } from '../../services/search.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-preventivo',
  templateUrl: './preventivo.component.html',
  styles: [
  ]
})

export class PreventivoComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private preventivesService: PreventivesService,
                private searchService: SearchService,
                private fb: FormBuilder,
                private fileUploadService: FileUploadService) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => {
          
          this.loadPreventiveId(id);
          
        });

  };

  /** ================================================================
   *  LOAD PREVENTIVE ID
  ==================================================================== */
  public preventive!: Preventive;
  loadPreventiveId(id: string){

    this.preventivesService.loadPreventiveId(id)
        .subscribe( ({preventive}) => {

          console.log(preventive);
          this.preventive = preventive;

          document.title = `Preventivo #${preventive.control} - LTC System`;
          

        });

  }

  /** ================================================================
   *  UPDATE CHECKIN - CHECKOUT
  ==================================================================== */
  updateCheck(tipo: 'checkin' | 'checkout'){
    
    let data:any;
    let text = 'de marcar el checkin ahora?';
    let confirmButtonText = 'Si, checkIn';
    let msg = 'El checkIn se a actualizado exitosamente!';

    if(tipo === 'checkin'){
      data = {
        checkin: Date.now()
      }
    }else{
      data = {
        checkout: Date.now()
      }
      msg = 'El checkOut se a actualizado exitosamente!';
      text = 'de marcar la checkout ahora?';
      confirmButtonText = 'Si, checkOut';
    }

    Swal.fire({
      title: 'Estas seguro?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText
    }).then((result) => {
      
      if (result.isConfirmed) {

        this.preventivesService.updatePreventives(data, this.preventive.preid)
        .subscribe( ({preventive}) => {

          this.preventive.checkin = preventive.checkin;
          this.preventive.checkout = preventive.checkout;
          Swal.fire('Estupendo', msg, 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Erro', err.error.msg, 'error');          
        });

      }

    })

    

  };

  /** =====================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *  NOTAS - CREATE
  ====================================================================================== */
  @ViewChild('notaI') notaI!: ElementRef;
  public formsNoteSubmitted: boolean = false;
  public formNotes =  this.fb.group({
    note: ['', [Validators.minLength(1), Validators.required]]
  });

  postNota(){

    this.notaI.nativeElement.value = '';
    this.formsNoteSubmitted = true;

    if (this.formNotes.invalid) {
      return;
    }

    this.preventivesService.postNotes(this.formNotes.value, this.preventive.preid)
        .subscribe( ({preventive}) =>{
          
          this.formsNoteSubmitted = false;
          this.formNotes.reset();

          this.preventive.notes = preventive.notes;
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        });
    
  }

  /** ======================================================================
   * VALIDATE FORM
  ====================================================================== */
  validate( campo: string): boolean{
    
    if ( this.formNotes.get(campo)?.invalid && this.formsNoteSubmitted ) {      
      return true;
    }else{
      return false;
    }

  }


  // FIN DE LA CLASE
}
