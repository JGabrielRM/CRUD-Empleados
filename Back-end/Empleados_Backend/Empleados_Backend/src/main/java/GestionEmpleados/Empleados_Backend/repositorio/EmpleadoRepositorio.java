package GestionEmpleados.Empleados_Backend.repositorio;

import GestionEmpleados.Empleados_Backend.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepositorio extends JpaRepository<Empleado, Integer> {
}
