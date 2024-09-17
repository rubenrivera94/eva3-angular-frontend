import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-detalle-registro',
  standalone: true,
  imports: [CommonModule], // Añadir CommonModule
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {
  paciente: any; // Datos del paciente, puede ser de tipo Paciente o un objeto genérico

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private route: ActivatedRoute // Importa ActivatedRoute para obtener parámetros de la URL
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtén el ID desde la URL
      if (id) {
        this.cargarPaciente(id);
      }
    });
  }

  // Método para cargar los datos del paciente
  cargarPaciente(id: string): void {
    this.pacienteService.getPacienteById(id).subscribe(
      data => {
        this.paciente = data;
      },
      error => {
        console.error('Error al cargar los datos del paciente:', error);
      }
    );
  }

  // Método para redirigir al formulario de actualización
  redirigirActualizar(): void {
    if (this.paciente) {
      this.router.navigate([`/registro/actualizar/${this.paciente._id}`]);
    }
  }

  // Método para eliminar el paciente
  eliminarPaciente(): void {
    if (this.paciente && confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(this.paciente._id).subscribe(
        () => {
          alert('Paciente eliminado correctamente.');
          this.router.navigate(['/registro/listar-todos']);
        },
        error => {
          console.error('Error al eliminar el paciente:', error);
          alert('Hubo un error al eliminar el paciente. Inténtalo de nuevo.');
        }
      );
    }
  }
  getFotoUrl(fotoPersonal: string): string {
    return `http://localhost:3000/api/upload/${fotoPersonal}`;
  }
}
