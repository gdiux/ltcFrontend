import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { SwiperOptions } from 'swiper';
import Swal from 'sweetalert2';

// MODELS
import { User } from 'src/app/models/users.model';
import { Corrective } from '../../models/correctives.model';

// SERVICES
import { CorrectivesService } from '../../services/correctives.service';
import { FileUploadService } from '../../services/file-upload.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-correctivo',
  templateUrl: './correctivo.component.html',
  styles: [
  ]
})
export class CorrectivoComponent implements OnInit {

  public user!: User;

  constructor(  private activatedRoute: ActivatedRoute,
                private correctivesService: CorrectivesService,
                private fb: FormBuilder,
                private fileUploadService: FileUploadService,
                private usersService: UsersService) { 

                  this.user = this.usersService.user;

                }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => {
          
          this.loadCorrectiveId(id);
          this.loadUsers();
          
        });

  }

  /** ================================================================
   *  EDIT DESCRIPTION
  ==================================================================== */
  updateDescription(description: string){

    if (description.length === 0) {
      Swal.fire('Atención', 'Debes de agregar una descripcion al mantenimiento, no debe ir vacio', 'warning');
      return;
    }

    this.correctivesService.updateCorrective({description}, this.corrective.coid!)
        .subscribe( ({ corrective }) => {

          this.corrective.description = corrective.description;
          Swal.fire('Estupendo', 'Se ha editado la descripción del correctivo exitosamente!', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })
    

  }


  /** ================================================================
   *  LOAD USERS
  ==================================================================== */
  public users: User[] = [];
  loadUsers(){

    this.usersService.loadUsers()
        .subscribe( ({users}) => {
          this.users = users.filter( user => user.status === true );
        }, (err) => {
          console.log(err);          
        });

  }

  /** ================================================================
   *  CAMBIAR TECNICO
  ==================================================================== */
  changeStaff(staff: string){

    if (staff.length === 0) {
      return;
    }

    this.correctivesService.updateCorrective({staff}, this.corrective.coid!)
        .subscribe( ({corrective}) => {

          this.loadCorrectiveId(this.corrective.coid!);
          Swal.fire('Estupendo', 'Se ha cambiado el tecnico exitosamente!', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *  LOAD CORRECTIVE ID
  ==================================================================== */
  private _corrective!: Corrective;
  public imgsbefore: boolean = false;
  public imgsafter: boolean = false;

  public get corrective(): Corrective {
    return this._corrective;
  }

  public set corrective(value: Corrective) {
    this._corrective = value;
  }
  
  loadCorrectiveId(id: string){

    this.correctivesService.loadCorrectiveId(id)
        .subscribe( ({corrective}) => {          
          
          this.corrective = corrective;

          if (corrective?.imgBef.length > 0) {
            this.imgsbefore = true;
          }

          if (corrective?.imgAft.length > 0) {
            this.imgsafter = true;
          }

          document.title = `Correctivo #${corrective?.control} - LTC System`;
          

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
        checkout: Date.now(),
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

        this.correctivesService.updateCorrective(data, this.corrective.coid!)
        .subscribe( ({corrective}) => {

          this.corrective.checkin = corrective.checkin;
          this.corrective.checkout = corrective.checkout;
          this.corrective.estado = corrective.estado;
          Swal.fire('Estupendo', msg, 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Erro', err.error.msg, 'error');          
        });

      }

    })

    

  };

  /** ================================================================
   *  FINALIZAR O ABRIR MANTENIMIENTO
  ==================================================================== */
  updateEstado(estado: string){

    if (estado === 'Pendiente') {
      estado = 'Terminado';
    }else{
      estado = 'Pendiente';
    }

    this.correctivesService.updateCorrective( {estado}, this.corrective.coid! )
        .subscribe( ({ corrective }) => {

          Swal.fire('Estupendo', 'Se ha actualizado el correctivo exitosamente!', 'success');
          this.corrective.estado = corrective.estado;

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

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

    this.correctivesService.postNotesCorrectives(this.formNotes.value, this.corrective.coid!)
        .subscribe( ({corrective}) =>{
          
          this.formsNoteSubmitted = false;
          this.formNotes.reset();

          this.corrective.notes = corrective.notes;
          

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
  public imgTempBef: any = null;
  public imgTempAft: any = null;
  public subirImagen!: File;
  cambiarImage(file: any, type: 'before' | 'after'): any{

    this.subirImagen = file.files[0];
    
    if (!this.subirImagen) {  
      if (type === 'before') {        
        return this.imgTempBef = null;      
      }else if (type === 'after') {
        return this.imgTempAft = null; 
      }      
    }
    
    let fileTemp = this.subirImagen;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(fileTemp);
    
    reader.onloadend = () => {

      if (type === 'before') {       
        this.imgTempBef = reader.result;
      }else if (type === 'after') {
        this.imgTempAft = reader.result;
      }
    }    

  }
      
  /** ================================================================
   *  SUBIR IMAGEN fileImg
  ==================================================================== */
  @ViewChild('fileImgBef') fileImgBef!: any;
  @ViewChild('fileImgAft') fileImgAft!: any;

  public imgProducto: string = 'no-image';

  subirImg(desc: 'imgBef' | 'imgAft' | 'video'){
    
    this.fileUploadService.updateImage( this.subirImagen, 'correctives', this.corrective.coid!, desc)
    .then( img => {

      console.log(img);
      

      if (desc === 'imgBef') {
        this.corrective.imgBef?.push({
          img: img.nombreArchivo,
          date: img.date
        });
        this.imgsbefore = true;
      }else if(desc === 'imgAft'){
        this.corrective.imgAft?.push({
          img: img.nombreArchivo,
          date: img.date
        });
        this.imgsafter = true;
      }

      
    });
    
    this.imgProducto = 'no-image';
    
    if (desc === 'imgBef') {
      this.imgTempBef = null;
      this.fileImgBef!.nativeElement.value = '';
    }else if(desc === 'imgAft'){
      this.imgTempAft = null;
      this.fileImgAft!.nativeElement.value = '';
    }
    
  }

  /** ================================================================
   *  DELETE IMAGEN fileImg
  ==================================================================== */
  deleteImg(img:string, desc: 'imgBef' | 'imgAft', type: 'correctives' | 'correctives' = 'correctives'){

    this.fileUploadService.deleteImg(type, this.corrective.coid!, desc, img)
        .subscribe( (resp:any) => {
          
          this.corrective.imgAft = resp.corrective.imgAft;
          this.corrective.imgBef = resp.corrective.imgBef;

          if (this.corrective.imgBef.length > 0) {
            this.imgsbefore = true;
          }  

          if (this.corrective.imgAft.length > 0) {
            this.imgsafter = true;
          }

          Swal.fire('Estupendo', 'Se ha eliminado la imagen con exito', 'success');
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        });
    

  }

  /** ================================================================
   *  RECIBE
  ==================================================================== */
  recibe(){

    Swal.fire({
      title: 'Escribe el nombre de la persona que recibe.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.correctivesService.updateCorrective( {recibe: result.value}, this.corrective.coid! )
            .subscribe( ({corrective}) => {

              this.corrective.recibe = corrective.recibe;

              Swal.fire({
                title: `Recibido por ${result.value}`,
                icon:'success'          
              })

            }, (err) => {
              console.log(err);              
            });        
      }
    })

  }

  /** ================================================================
   *  CHECKLIST
  ==================================================================== */
  checklist( name: string, status: boolean ){

    if (name === 'red') {
      this.corrective.red = status;
    }else if (name === 'operativa') {
      this.corrective.operativa = status;
    }

    this.correctivesService.updateCorrective({red: this.corrective.red, operativa: this.corrective.operativa}, this.corrective.coid!)
        .subscribe( ({}) => {
          Swal.fire('Estupendo', 'se actualizo el correctivo exitosamente!', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        })    

  }

  /** ================================================================
   *  DELETE NOTE
  ==================================================================== */
  deleteNote(note: string){

    Swal.fire({
      title: "Estas seguro?",
      text: "De borrar este comentario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.correctivesService.deleteNoteCorrective(this.corrective.coid!, note)
            .subscribe( ({corrective}) => {

              this.corrective.notes = corrective.notes;
              Swal.fire('Estupendo', 'Se ha borrado el comentario exitosamente!', 'success');

            }, (err) => {
              console.log(err);
              Swal.fire('Error', err.error.msg, 'error');              
            });

      }
    });
    

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
    centeredSlides: true,
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
