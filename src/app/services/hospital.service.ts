import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Hospital } from '../common/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiJpa = 'http://localhost:8090/hospital-service-orm/api/v1/hospitals';
  private apiPlsql = 'http://localhost:8090/hospital-service-plsql/api/v2/hospitals'

  constructor(
    private httpClient: HttpClient
  ) { }

  // Método para obtener todos los hospitales
  getHospitals(page: number, size: number): Observable<any> {
    return this.httpClient.get(`${this.apiJpa}?size=${size}&page=${page}`).pipe(
      map((response: any) => {
        console.log('Response from API (getHospitals):', response);
        if (response && Array.isArray(response.data)) {
          response.data = response.data.map((hospital: any) => new Hospital(
            hospital.idHospital,
            hospital.idDistrito,
            hospital.nombreHospital,
            hospital.antiguedad,
            hospital.area,
            hospital.idSede,
            hospital.idGerente,
            hospital.idCondicion,
            new Date(hospital.fechaRegistro)
          ));
        } else {
          response.data = [];
        }
        return {
          hospitals: response.data,
          metadata: response.metadata
        };
      }),
      catchError(this.handleError)
    );
  }

  // Método para buscar un hospital por su ID
  searchHospitalById(idHospital: number): Observable<Hospital> {
    return this.httpClient.get<Hospital>(`${this.apiPlsql}/by-id/${idHospital}`).pipe(
      map((response: any) => {
        if (response) {
          return new Hospital(
            response.idHospital,
            response.idDistrito,
            response.nombreHospital,
            response.antiguedad,
            response.area,
            response.idSede,
            response.idGerente,
            response.idCondicion,
            new Date(response.fechaRegistro)
          );
        } else {
          throw new Error('Hospital no encontrado');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para filtrar hospitales por sede
  filterHospitalsBySede(idSede: number): Observable<Hospital[]> {
    return this.httpClient.get<any>(`${this.apiPlsql}/by-sedeId/${idSede}`).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response.map((hospital: any) => new Hospital(
            hospital.idHospital,
            hospital.idDistrito,
            hospital.nombreHospital,
            hospital.antiguedad,
            hospital.area,
            hospital.idSede,
            hospital.idGerente,
            hospital.idCondicion,
            new Date(hospital.fechaRegistro)
          ));
        } else {
          console.error('Error: La respuesta no es un array');
          return [];
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para eliminar un hospital
  deleteHospital(idHospital: number): Observable<boolean> {
    return this.httpClient.delete<any>(`${this.apiPlsql}/delete/${idHospital}`).pipe(
      map((response: any) => {
        return response.deleted === true;
      }),
      catchError(this.handleError)
    );
  }

  // Método para registrar un nuevo hospital
  registerHospital(hospital: Hospital): Observable<Hospital> {
    return this.httpClient.post<Hospital>(`${this.apiPlsql}/create`, hospital).pipe(
      map((response: any) => new Hospital(
        response.idHospital,
        response.idDistrito,
        response.nombreHospital,
        response.antiguedad,
        response.area,
        response.idSede,
        response.idGerente,
        response.idCondicion,
        new Date(response.fechaRegistro)
      )),
      catchError(this.handleError)
    );
  }

  // Método para actualizar un hospital existente
  updateHospital(idHospital: number, hospital: Partial<Hospital>): Observable<Hospital> {
    return this.httpClient.put<Hospital>(`${this.apiPlsql}/update/${idHospital}`, hospital).pipe(
      map((response: any) => new Hospital(
        response.idHospital,
        response.idDistrito,
        response.nombreHospital,
        response.antiguedad,
        response.area,
        response.idSede,
        response.idGerente,
        response.idCondicion,
        new Date(response.fechaRegistro)
      )),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
