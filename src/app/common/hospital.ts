export class Hospital {
  constructor(
    public idHospital: number,
    public idDistrito: number,
    public nombreHospital: string,
    public antiguedad: number,
    public area: number,
    public idSede: number,
    public idGerente: number,
    public idCondicion: number,
    public fechaRegistro: Date
  ) { }
}
