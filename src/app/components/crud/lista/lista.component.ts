import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../common/hospital';
import { HospitalService } from '../../../services/hospital.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {
  SEDES,
  CONDICIONES,
  GERENTES,
  DISTRITOS,
  SEDE_TEXTS,
  CONDICION_TEXTS,
  GERENTE_TEXTS,
  DISTRITO_TEXTS
} from '../../../constant/data.constants';
import { faRotateRight, faPlus, faShapes, faCloud } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  hospitals: Hospital[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  searchIdHospital: number | null = null;
  searchIdSede: number | null = null;
  searchType: string = 'idHospital';
  sedes = SEDES;
  condiciones = CONDICIONES;
  gerentes = GERENTES;
  distritos = DISTRITOS;
  sedeTexts = SEDE_TEXTS;
  condicionesTexts = CONDICION_TEXTS;
  gerentesTexts = GERENTE_TEXTS;
  distritosTexts = DISTRITO_TEXTS;
  icoRecharge = faRotateRight;
  icoAdd = faPlus;
  icoOptions = faShapes;
  icoCloud = faCloud;

  constructor(
    private hospitalService: HospitalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getHospitals(this.currentPage);
  }

  getHospitals(page: number): void {
    this.hospitalService.getHospitals(page - 1, this.pageSize).subscribe(
      (data: any) => {
        this.hospitals = data.hospitals;
        this.totalPages = data.metadata.totalPages;
        this.totalItems = data.metadata.totalItems;
        this.currentPage = 1;
        this.toastr.success('Hospitales cargados con éxito');
      },
      (error) => {
        console.error('Error fetching hospitals', error);
        this.hospitals = [];
        this.totalPages = 0;
        this.totalItems = 0;
        this.toastr.error(`Error al cargar hospitales, Codigo: ${error.status} Mensaje: ${error.message}`, 'Error');
      }
    );
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.getHospitals(page);
    }
  }

  search(): void {
    if (this.searchType === 'idHospital' && this.searchIdHospital != null) {
      this.hospitalService.searchHospitalById(this.searchIdHospital).subscribe(
        (data: Hospital) => {
          console.log('Hospital encontrado:', data);
          this.hospitals = [data];
          this.totalPages = 1;
          this.totalItems = 1;
          this.toastr.success('Hospital encontrado');
        },
        (error) => {
          console.error('Error al buscar hospital por ID:', error);
          this.hospitals = [];
          this.totalPages = 0;
          this.totalItems = 0;
          this.toastr.error(`Error ${error.status}: ${error.message}`, 'Error');
        }
      );
    } else if (this.searchType === 'idSede' && this.searchIdSede != null) {
      this.hospitalService.filterHospitalsBySede(this.searchIdSede).subscribe(
        (data: Hospital[]) => {
          console.log('Hospitales filtrados por sede:', data);
          this.hospitals = data;
          this.totalPages = 1;
          this.totalItems = data.length;
          this.toastr.success('Hospitales filtrados por sede');
        },
        (error) => {
          console.error('Error al filtrar hospitales por sede:', error);
          this.hospitals = [];
          this.totalPages = 0;
          this.totalItems = 0;
          this.toastr.error(`Error ${error.status}: ${error.message}`, 'Error');
        }
      );
    }
  }

  confirmDelete(hospitalId: number): void {
    Swal.fire({
      title: '¡PELIGRO!',
      text: '¿Estás seguro que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteHospital(hospitalId);
      }
    });
  }

  deleteHospital(idHospital: number): void {
    this.hospitalService.deleteHospital(idHospital).subscribe(
      (response: any) => {
        if (response === true) {
          this.toastr.success('Hospital eliminado con éxito', 'Éxito');
          this.getHospitals(this.currentPage);
        } else {
          this.toastr.error('No se pudo eliminar el hospital', 'Error');
        }
      },
      (error) => {
        console.error('Error al eliminar hospital:', error);
        this.toastr.error(error.message, 'Error');
      }
    );
  }

  getSedeText(idSede: number): string {
    return this.sedeTexts[idSede] || 'Desconocida';
  }
  getCondicionText(idCondicion: number): string {
    return this.condicionesTexts[idCondicion] || 'Desconocida';
  }
  getGerenteText(idGerente: number): string {
    return this.gerentesTexts[idGerente] || 'Desconocido';
  }
  getDistritoText(idDistrito: number): string {
    return this.distritosTexts[idDistrito] || 'Desconocido';
  }

  reloadPage() {
    window.location.reload();
  }

}
