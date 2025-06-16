# Samanta - Sistema de Asistencia a Charlas Universitarias

![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Tecnología](https://img.shields.io/badge/Vue.js-3.5.16-green.svg)
![Estado](https://img.shields.io/badge/estado-MVP-orange.svg)

## 📋 Descripción

**PUCMMTUB** es un sistema MVP (Producto Mínimo Viable) para la gestión de asistencia y control de charlas universitarias. Permite a las instituciones educativas llevar un registro digital de la asistencia de estudiantes a eventos académicos como conferencias, tertulias, foros y seminarios.

### Características Principales

- ✅ **Dashboard** con estadísticas en tiempo real
- 👥 **Gestión de estudiantes** con seguimiento de progreso
- 🎤 **Catálogo de charlas** con información detallada
- 📱 **Escaneo de carnets** para registro de asistencia
- 📊 **Sistema de reportes** y estados de cumplimiento
- 🎨 **Interfaz moderna** y responsive
- 🚀 **Datos mockeados** para demostración completa

## 🏗️ Arquitectura del Proyecto

```
Samanta/
├── index.html              # Archivo principal
├── css/
│   └── styles.css          # Framework CSS con variables
├── js/
│   ├── app.js             # Aplicación Vue.js principal
│   └── data.js            # Datos mockeados y funciones
├── components/             # Directorio para componentes Vue
└── README.md              # Documentación del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3.5.16** (CDN) - Framework reactivo
- **CSS Variables** - Sistema de design tokens
- **HTML5** - Estructura semántica
- **JavaScript ES6+** - Lógica de aplicación
- **Responsive Design** - Compatible con móviles

## 🚀 Instalación y Uso

### Prerequisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desarrollo)

### Instalación

1. **Clona o descarga** el proyecto:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Samanta
   ```

2. **Abre el proyecto** de una de estas formas:

   **Opción A: Directamente en el navegador**
   ```bash
   # Simplemente abre index.html en tu navegador
   open index.html
   ```

   **Opción B: Con servidor local (recomendado)**
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (npx)
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Accede a la aplicación**:
   - Abre `http://localhost:8000` en tu navegador

## 📱 Guía de Uso

### Dashboard
- Visualiza estadísticas generales del sistema
- Resumen de estudiantes activos y charlas completadas
- Métricas de cumplimiento por carrera

### Gestión de Estudiantes
- Lista completa de estudiantes registrados
- Estados de progreso: Completado, En progreso, Atrasado, Crítico
- Información detallada por carrera y requisitos

### Catálogo de Charlas
- Todas las charlas disponibles y completadas
- Información de fecha, lugar, asistentes y valor
- Categorización por temas

### Escaneo de Carnets
- Interfaz para registrar asistencia en tiempo real
- Validación automática de estudiantes
- Lista de asistencia actual por evento

## 🧪 Datos de Prueba

El sistema incluye datos mockeados para demostración:

### Estudiantes de Ejemplo
- **Juan Carlos Pérez** (2021001) - Ingeniería en Sistemas
- **María Elena García** (2020045) - Medicina  
- **Carlos Alberto López** (2022078) - Derecho
- **Ana Sofía Martínez** (2021156) - Administración
- **Roberto Daniel Hernández** (2020234) - Psicología
- **Lucía Fernanda Morales** (2022345) - Arquitectura
- **Diego Alejandro Ramos** (2021567) - Ingeniería en Sistemas
- **Valentina Isabel Torres** (2020678) - Medicina

### Carreras y Requisitos
| Carrera | Charlas Requeridas | Código |
|---------|-------------------|--------|
| Ingeniería en Sistemas | 15 | IS |
| Medicina | 20 | MED |
| Derecho | 10 | DER |
| Administración | 12 | ADM |
| Psicología | 14 | PSI |
| Arquitectura | 16 | ARQ |

### Para Pruebas Rápidas
Usa estos carnets en el escáner:
- `2021001` - Juan Carlos (progreso normal)
- `2020045` - María Elena (atrasada)
- `2022078` - Carlos Alberto (completado)
- `2021156` - Ana Sofía (crítico)

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primario**: `hsl(220, 100%, 50%)` - Azul principal
- **Secundario**: `hsl(280, 60%, 50%)` - Púrpura
- **Éxito**: `hsl(120, 50%, 45%)` - Verde
- **Advertencia**: `hsl(45, 100%, 50%)` - Amarillo
- **Peligro**: `hsl(0, 70%, 50%)` - Rojo
- **Información**: `hsl(200, 80%, 50%)` - Azul claro

### Tipografía
- **Fuente Principal**: System Font Stack
- **Escala**: 12px - 48px
- **Pesos**: 300, 400, 500, 600, 700

### Espaciado
- **Sistema Base**: 4px grid
- **Unidades**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 🔧 Desarrollo

### Estructura de Archivos CSS
```css
:root {
  /* Variables de color */
  --color-primary: hsl(220, 100%, 50%);
  
  /* Variables de espaciado */
  --space-4: 1rem;
  
  /* Variables de tipografía */
  --font-size-base: 1rem;
}
```

### Componentes Vue.js
```javascript
// Ejemplo de componente
const { createApp, ref } = Vue;

const app = createApp({
  setup() {
    const currentView = ref('dashboard');
    
    return {
      currentView
    };
  }
});
```

### Debugging
Abre la consola del navegador y usa:
```javascript
// Ver datos de la aplicación
window.SAMANTA_DEBUG.getAppData()

// Agregar asistencias de prueba
window.SAMANTA_DEBUG.addTestAttendance()

// Limpiar asistencia
window.SAMANTA_DEBUG.clearAllAttendance()

// Simular asistencias aleatorias
window.SAMANTA_DEBUG.simulateRandomAttendance(5)
```

## 📋 Funcionalidades del MVP

### ✅ Implementado
- [x] Dashboard con estadísticas
- [x] Lista de estudiantes con estados
- [x] Catálogo de charlas
- [x] Escaneo manual de carnets
- [x] Validación de asistencia
- [x] Sistema de estados de progreso
- [x] Interfaz responsive
- [x] Datos mockeados completos

### 🔄 Próximas Fases
- [ ] Integración con base de datos real
- [ ] Autenticación y roles de usuario
- [ ] Reportes en PDF
- [ ] Notificaciones push
- [ ] API REST para integración
- [ ] Scanner de códigos QR/barras real
- [ ] Gestión de múltiples eventos simultáneos
- [ ] Exportación de datos

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseño UX/UI**: [Nombre del Diseñador]
- **Product Owner**: [Nombre del PO]

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@PUCMMTUB-system.com
- 💬 Issues: [GitHub Issues](URL_ISSUES)
- 📚 Documentación: [Wiki del Proyecto](URL_WIKI)

## 🔄 Historial de Versiones

### v1.0.0 (Actual)
- ✨ MVP inicial con funcionalidades básicas
- 🎨 Sistema de diseño implementado
- 📱 Interfaz responsive
- 🧪 Datos de prueba completos

---

**Hecho con ❤️ para la educación universitaria** 