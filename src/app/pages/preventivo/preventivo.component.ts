import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// MODELS
import { Preventive } from 'src/app/models/preventives.model';

// SERVICES
import { PreventivesService } from '../../services/preventives.service';
import { SearchService } from '../../services/search.service';
import { FileUploadService } from '../../services/file-upload.service';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-preventivo',
  templateUrl: './preventivo.component.html',
  styleUrls: ['./preventivo.component.css']
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
  private _preventive!: Preventive;

  public get preventive(): Preventive {
    return this._preventive;
  }

  public set preventive(value: Preventive) {
    this._preventive = value;
  }
  
  loadPreventiveId(id: string){

    this.preventivesService.loadPreventiveId(id)
        .subscribe( ({preventive}) => {

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

        this.preventivesService.updatePreventives(data, this.preventive.preid!)
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
    note: ['', [Validators.minLength(1), Validators.required]],
    date: ['']
  });

  postNota(){

    this.notaI.nativeElement.value = '';
    this.formsNoteSubmitted = true;

    if (this.formNotes.invalid) {
      return;
    }

    // AGREGAR FECHA
    this.formNotes.value.date = Date.now();

    this.preventivesService.postNotes(this.formNotes.value, this.preventive.preid!)
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


  /** ================================================================
   *  ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   * ======================================================================================
   *   ACTUALIZAR IMAGEN
  ==================================================================== */
  public imgTemp: any = null;
  public subirImagen!: File;
  cambiarImage(file: any): any{

    this.subirImagen = file.files[0];
    
    if (!this.subirImagen ) {       
      return this.imgTemp = null;      
    }    
    
    let fileTemp = this.subirImagen;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(fileTemp);
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }    

  }
      
  /** ================================================================
   *  SUBIR IMAGEN fileImg
  ==================================================================== */
  @ViewChild('fileImg') fileImg!: any;

  public imgProducto: string = 'no-image';

  subirImg(desc: 'imgBef' | 'imgAft' | 'video'){
    
    this.fileUploadService.updateImage( this.subirImagen, 'preventives', this.preventive.preid!, desc)
    .then( img => {

      if (desc === 'imgBef') {
        this.preventive.imgBef?.push({
          img
        });        
      }else if(desc === 'imgAft'){
        this.preventive.imgAft?.push({
          img
        });
      }

      
    });
    
    this.fileImg!.nativeElement.value = '';
    this.imgProducto = 'no-image';
    this.imgTemp = null;
    
  }

  /** ===================================================================
   * SWIPER
  ======================================================================= */

  public config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      100: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  };


  // FIN DE LA CLASE
}
