import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para redirigir después de guardar
import { Paciente } from '../../models/paciente.model';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf y *ngFor
import { FileUploader, FileUploadModule } from 'ng2-file-upload'; // Importar FileUploader
import { PacienteService } from '../../services/paciente.service';  // Importa el servicio

@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModule],
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent {
  paciente: Paciente = new Paciente('', '', '', 0, '', '', new Date(), '', false);

  // Configuración del FileUploader
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api/pacientes',
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 20 * 1024 * 1024, // 20 MB
    headers: [{ name: 'Authorization', value: 'Bearer your-auth-token' }] // Agregar encabezados si es necesario
  });

  hasBaseDropZoneOver = false;

  constructor(private router: Router, private pacienteService: PacienteService) { }

  // Manejar el "hover" sobre la zona de arrastre de archivos
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onSubmit(pacienteForm: NgForm) {
    if (pacienteForm.valid) {
      // Verificar si hay archivos en la cola del uploader
      if (this.uploader.queue.length > 0) {
        // Enviar el FormData al servidor usando el servicio
        this.pacienteService.crearPaciente(this.uploader, this.paciente).subscribe(
          response => {
            console.log('Paciente guardado correctamente:', response);
            this.router.navigate(['/registro/listar-todos']);
          },
          error => {
            console.error('Error al guardar el paciente:', error);
            alert('Hubo un error al guardar el paciente. Inténtalo de nuevo.');
          }
        );
      } else {
        alert('Por favor, seleccione una foto.');
      }
    } else {
      alert('Error: Todos los campos requeridos deben estar completos y válidos.');
    }
  }
}