import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { FileUploader } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api/pacientes'; // URL de invocación de la API backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los pacientes
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  // Obtener paciente por ID
  getPacienteById(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo paciente
  crearPaciente(uploader: FileUploader, paciente: Paciente): Observable<Paciente> {
    const formData = new FormData();

    // Añadir los datos del paciente al FormData
    formData.append('rut', paciente.rut);
    formData.append('nombre', paciente.nombre);
    formData.append('edad', paciente.edad.toString());
    formData.append('sexo', paciente.sexo);
    formData.append('enfermedad', paciente.enfermedad);

    // Verificar si hay archivos en la cola del uploader
    if (uploader.queue.length > 0) {
      const fileItem = uploader.queue[0].file; // Obtener el archivo como File
      formData.append('fotoPersonal', fileItem.rawFile as Blob, fileItem.name); // Asegurarse de que se trata como Blob
    }

    // Enviar la solicitud POST con FormData
    return this.http.post<Paciente>(this.apiUrl, formData);
  }

  // Actualizar paciente
  actualizarPaciente(id: string, uploader: FileUploader, paciente: Paciente): Observable<Paciente> {
    const formData = new FormData();

    // Añadir los datos del paciente al FormData
    formData.append('rut', paciente.rut);
    formData.append('nombre', paciente.nombre);
    formData.append('edad', paciente.edad.toString());
    formData.append('sexo', paciente.sexo);
    formData.append('enfermedad', paciente.enfermedad);

    // Verificar si hay archivos en la cola del uploader (es decir, si se ha subido una nueva imagen)
    if (uploader.queue.length > 0) {
      const fileItem = uploader.queue[0].file; // Obtener el archivo como File
      formData.append('fotoPersonal', fileItem.rawFile as Blob, fileItem.name); // Adjuntar el archivo al FormData
    }

    // Enviar la solicitud PUT con FormData para actualizar el paciente
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, formData);
  }

  // Eliminar paciente
  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para buscar pacientes según los filtros: sexo, fechaIngreso y enfermedad
  buscarPacientes(filtros: { search?: string; sexo?: string; fechaIngreso?: string; enfermedad?: string }): Observable<Paciente[]> {
    const params: any = {}; // Objeto para almacenar los parámetros de búsqueda

    // Condicionales para agregar los parámetros solo si existen
    if (filtros.search) params.search = filtros.search;
    if (filtros.sexo) params.sexo = filtros.sexo;
    if (filtros.fechaIngreso) params.fechaIngreso = filtros.fechaIngreso;
    if (filtros.enfermedad) params.enfermedad = filtros.enfermedad;

    // Enviar la solicitud GET con los parámetros de búsqueda
    return this.http.get<Paciente[]>(`${this.apiUrl}/buscar`, { params });
  }

  // Cargar foto personal
  subirFoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:3000/api/upload', formData, {
      withCredentials: true, // Para incluir cookies si es necesario
      headers: {
        'Accept': 'application/json'
      }
    });
  }

}
