import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service'; // Importa el servicio
import { Router } from '@angular/router'; // Importa Router para redirigir a los detalles

@Component({
  selector: 'app-listar-registros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.css']
})
export class ListarRegistrosComponent implements OnInit {

  @Input() pacientes: Paciente[] = []; // Recibe los pacientes como input desde el componente padre

  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (data: Paciente[]) => {
        this.pacientes = data;
      },
      error => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  verDetalle(id: string): void {
    // Redirige a la página de detalles del paciente usando id
    this.router.navigate([`/registro/detalle/${id}`]);
  }

  eliminarPaciente(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar a este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe(
        response => {
          console.log('Paciente eliminado correctamente:', response);
          // Recargar la lista de pacientes después de la eliminación
          this.cargarPacientes();
        },
        error => {
          console.error('Error al eliminar el paciente:', error);
          alert('Hubo un error al eliminar el paciente.');
        }
      );
    }
  }
  getFotoUrl(fotoPersonal: string): string {
    return `http://localhost:3000/api/upload/${fotoPersonal}`;
  }
}
