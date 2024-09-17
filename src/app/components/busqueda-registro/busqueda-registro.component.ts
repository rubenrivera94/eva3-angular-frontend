import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Paciente } from '../../models/paciente.model';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf y *ngFor

@Component({
  selector: 'app-busqueda-registro',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de importar FormsModule aquí

  templateUrl: './busqueda-registro.component.html',
  styleUrl: './busqueda-registro.component.css'
})
export class BusquedaRegistroComponent implements OnInit {
  sexo: string = '';
  fechaIngreso: string = '';
  enfermedad: string = '';
  pacientesFiltrados: Paciente[] = [];

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.sexo = params['sexo'] || '';
      this.fechaIngreso = params['fechaIngreso'] || '';
      this.enfermedad = params['enfermedad'] || '';

      // Buscar pacientes con los filtros iniciales
      this.buscarPacientes();
    });
  }

  buscarPacientes(): void {
    const filtros = {
      sexo: this.sexo,
      fechaIngreso: this.fechaIngreso,
      enfermedad: this.enfermedad
    };

    this.pacienteService.buscarPacientes(filtros).subscribe(
      (pacientes) => {
        this.pacientesFiltrados = pacientes;
      },
      (error) => {
        console.error('Error al buscar pacientes:', error);
      }
    );
  }

  onBuscar(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sexo: this.sexo,
        fechaIngreso: this.fechaIngreso,
        enfermedad: this.enfermedad
      },
      queryParamsHandling: 'merge' // Mantiene los parámetros existentes
    });
  }
}