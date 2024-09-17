export class Paciente {
    _id: string;
    rut: string;
    nombre: string;
    edad: number;
    sexo: string;
    fotoPersonal: string;
    fechaIngreso: Date;
    enfermedad: string;
    revisado: boolean;

    constructor(
        _id: string,
        rut: string,
        nombre: string,
        edad: number,
        sexo: string,
        fotoPersonal: string,
        fechaIngreso: Date,
        enfermedad: string,
        revisado: boolean
    ) {
        this._id = _id;
        this.rut = rut;
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
        this.fotoPersonal = fotoPersonal;
        this.fechaIngreso = fechaIngreso;
        this.enfermedad = enfermedad;
        this.revisado = revisado;
    }
}
