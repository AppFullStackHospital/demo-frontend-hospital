import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Hospital } from '../../../common/hospital';
import { HospitalService } from '../../../services/hospital.service';
import {
  SEDES,
  CONDICIONES,
  GERENTES,
  DISTRITOS
} from '../../../constant/data.constants';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formMode: 'register' | 'update' = 'register';
  hospital: Hospital = new Hospital(0, 0, '', 0, 0, 0, 0, 0, new Date());
  showErrors: boolean = false;
  sedes: any[] = SEDES;
  condiciones: any[] = CONDICIONES;
  gerentes: any[] = GERENTES;
  distritos: any[] = DISTRITOS;

  constructor(
    private hospitalService: HospitalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.checkFormMode();
    if (this.formMode === 'register') {
      this.generateRandomId();
    }
  }

  checkFormMode() {
    const url = this.router.url;
    if (url.includes('register')) {
      this.formMode = 'register';
      this.generateRandomId();
    } else if (url.includes('update')) {
      this.formMode = 'update';
    }
  }

  onSubmit() {
    this.showErrors = true;

    if (this.isValidForm()) {
      if (this.formMode === 'register') {
        this.registerHospital();
      } else {
        this.updateHospital();
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos.');
    }
  }

  isValidForm(): boolean {
    return !!this.hospital.idHospital &&
      !!this.hospital.idDistrito &&
      !!this.hospital.nombreHospital &&
      !!this.hospital.antiguedad &&
      !!this.hospital.area &&
      !!this.hospital.idSede &&
      !!this.hospital.idGerente &&
      !!this.hospital.idCondicion;
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['formMode']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.formMode === 'register') {
      this.generateRandomId();
    }
  }

  searchHospitalById(event: Event) {
    event.preventDefault();
    if (this.hospital.idHospital) {
      this.hospitalService.searchHospitalById(this.hospital.idHospital)
        .subscribe({
          next: (data: Hospital) => {
            this.hospital = data;
            console.log(this.hospital);

            this.toastr.success('Hospital encontrado');
          },
          error: (error) => {
            this.toastr.error('Hospital no encontrado');
          }
        });
    } else {
      this.toastr.warning('Por favor, ingrese un ID de Hospital válido');
    }
  }

  generateRandomId() {
    const min = 1000;
    const max = 999999999;
    this.hospital.idHospital = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  registerHospital() {
    this.hospitalService.registerHospital(this.hospital)
      .subscribe({
        next: () => {
          this.toastr.success('Hospital registrado exitosamente');
          this.router.navigate(['/hospitals']);
        },
        error: (error) => {
          this.toastr.error('Error al registrar hospital');
        }
      });
  }

  updateHospital() {
    if (this.hospital.idHospital) {
      this.hospitalService.updateHospital(this.hospital.idHospital, this.hospital)
        .subscribe({
          next: () => {
            this.toastr.success('Hospital actualizado exitosamente');
            this.router.navigate(['/hospitals']);
          },
          error: (error) => {
            this.toastr.error('Error al actualizar hospital');
          }
        });
    } else {
      this.toastr.warning('Por favor, ingrese un ID de Hospital válido para actualizar');
    }
  }

  resetForm() {
    if (this.formMode === 'register') {
      this.hospital = new Hospital(0, 0, '', 0, 0, 0, 0, 0, new Date());
      this.generateRandomId();
      this.formMode = 'register';
    } else if (this.formMode === 'update') {
      this.hospital.idHospital = 0;
      this.hospital.idDistrito = 0;
      this.hospital.nombreHospital = '';
      this.hospital.antiguedad = 0;
      this.hospital.area = 0;
      this.hospital.idSede = 0;
      this.hospital.idGerente = 0;
      this.hospital.idCondicion = 0;
      this.formMode = 'update';
    }
  }
}
