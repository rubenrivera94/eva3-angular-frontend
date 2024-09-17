import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-actualizar-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModule],
  templateUrl: './actualizar-registro.component.html',
  styleUrls: ['./actualizar-registro.component.css']
})
export class ActualizarRegistroComponent implements OnInit {
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

  hasBaseDropZoneOver: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  // Manejar el "hover" sobre la zona de arrastre de archivos
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarPaciente(id);
      }
    });
  }

  cargarPaciente(id: string): void {
    this.pacienteService.getPacienteById(id).subscribe(
      (data: Paciente) => {
        this.paciente = data;
      },
      error => {
        console.error('Error al cargar los datos del paciente:', error);
      }
    );
  }

  // Método onSubmit para procesar la actualización del paciente
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return; // Si el formulario no es válido, salir
    }

    const id = this.paciente._id; // Obtener el ID del paciente
    if (!id) {
      console.error('ID del paciente no disponible.');
      return;
    }

    // Llamar al servicio para actualizar los datos del paciente
    this.pacienteService.actualizarPaciente(id, this.uploader, this.paciente).subscribe(
      response => {
        console.log('Paciente actualizado exitosamente:', response);
        this.router.navigate(['/registro/listar-todos']); // Redirigir a la lista de pacientes tras la actualización
      },
      error => {
        console.error('Error al actualizar el paciente:', error);
      }
    );
  }
}
