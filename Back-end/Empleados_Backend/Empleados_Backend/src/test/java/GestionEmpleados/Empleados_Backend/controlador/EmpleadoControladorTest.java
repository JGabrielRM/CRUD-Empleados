package GestionEmpleados.Empleados_Backend.controlador;

import GestionEmpleados.Empleados_Backend.Excepciones.RecursoNoEncontrado;
import GestionEmpleados.Empleados_Backend.controlador.EmpleadoControlador;
import GestionEmpleados.Empleados_Backend.modelo.Empleado;
import GestionEmpleados.Empleados_Backend.servicio.IEmpleadoServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmpleadoControladorTest {

    @Mock
    private IEmpleadoServicio empleadoServicio;

    @InjectMocks
    private EmpleadoControlador empleadoControlador;

    private Empleado empleado;

    @BeforeEach
    void setUp() {
        empleado = new Empleado();
        empleado.setIdEmpleado(1);
        empleado.setNombre("Juan Perez");
        empleado.setCorreo("juan@example.com");
    }

    @Test
    void obtenerEmpleados() {
        when(empleadoServicio.listarEmpleados()).thenReturn(Arrays.asList(empleado));
        List<Empleado> empleados = empleadoControlador.obtenerEmpleados();
        assertEquals(1, empleados.size());
        assertEquals("Juan Perez", empleados.get(0).getNombre());
    }

    @Test
    void agregarEmpleado() {
        when(empleadoServicio.guardarEmpleado(any(Empleado.class))).thenReturn(empleado);
        Empleado nuevoEmpleado = empleadoControlador.agregarEmpleado(empleado);
        assertNotNull(nuevoEmpleado);
        assertEquals("Juan Perez", nuevoEmpleado.getNombre());
    }

    @Test
    void obtenerEmpleadoPorId_existente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(empleado);
        ResponseEntity<Empleado> respuesta = empleadoControlador.obtenerEmpleadoPorId(1);
        assertNotNull(respuesta.getBody());
        assertEquals("Juan Perez", respuesta.getBody().getNombre());
    }

    @Test
    void obtenerEmpleadoPorId_noExistente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(null);
        assertThrows(RecursoNoEncontrado.class, () -> empleadoControlador.obtenerEmpleadoPorId(1));
    }

    @Test
    void actualizarEmpleado_existente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(empleado);
        when(empleadoServicio.guardarEmpleado(any(Empleado.class))).thenReturn(empleado);

        Empleado empleadoActualizado = new Empleado();
        empleadoActualizado.setNombre("Carlos Gomez");
        empleadoActualizado.setCorreo("carlos@example.com");

        ResponseEntity<Empleado> respuesta = empleadoControlador.actualizarEmpleado(1, empleadoActualizado);
        assertNotNull(respuesta.getBody());
        assertEquals("Carlos Gomez", respuesta.getBody().getNombre());
    }

    @Test
    void actualizarEmpleado_noExistente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(null);
        assertThrows(RecursoNoEncontrado.class, () -> empleadoControlador.actualizarEmpleado(1, empleado));
    }

    @Test
    void eliminarEmpleado_existente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(empleado);
        doNothing().when(empleadoServicio).eliminarEmpleado(empleado);

        ResponseEntity<Map<String, Boolean>> respuesta = empleadoControlador.eliminarEmpleado(1);
        assertTrue(respuesta.getBody().get("eliminado"));
    }

    @Test
    void eliminarEmpleado_noExistente() {
        when(empleadoServicio.buscarEmpleadoPorId(1)).thenReturn(null);
        assertThrows(RecursoNoEncontrado.class, () -> empleadoControlador.eliminarEmpleado(1));
    }
}
