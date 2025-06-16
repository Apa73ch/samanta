/* ============================================================================
   DATOS MOCKEADOS - SISTEMA SAMANTA
   Datos de ejemplo para demostrar el flujo completo del sistema
============================================================================ */

// Configuración de carreras y sus requisitos
const CARRERAS = {
  'Ingeniería en Sistemas': { requiredTalks: 15, code: 'IS' },
  'Medicina': { requiredTalks: 20, code: 'MED' },
  'Derecho': { requiredTalks: 10, code: 'DER' },
  'Administración': { requiredTalks: 12, code: 'ADM' },
  'Psicología': { requiredTalks: 14, code: 'PSI' },
  'Arquitectura': { requiredTalks: 16, code: 'ARQ' }
};

/* ============================================================================
   DATOS DE MUESTRA MEJORADOS PARA DEMO - FASE 8.3
============================================================================ */

// Estudiantes mockeados con datos más realistas para demostración
const MOCK_STUDENTS = [
  {
    id: 1,
    carnet: '2021001',
    name: 'Juan Carlos Pérez Mendoza',
    career: 'Ingeniería en Sistemas',
    completedTalks: 12,
    requiredTalks: CARRERAS['Ingeniería en Sistemas'].requiredTalks,
    email: 'juan.perez@universidad.edu.sv',
    phone: '+503 7555-1234',
    attendedTalks: [1, 2, 3, 5, 7, 8, 10, 11, 12, 14, 15, 16],
    registrationDate: '2021-02-15',
    semester: '8vo Ciclo',
    status: 'Activo',
    gpa: 8.5,
    profileImage: null
  },
  {
    id: 2,
    carnet: '2020045',
    name: 'María Elena García Rodríguez',
    career: 'Medicina',
    completedTalks: 8,
    requiredTalks: CARRERAS['Medicina'].requiredTalks,
    email: 'maria.garcia@universidad.edu.sv',
    phone: '+503 7555-2345',
    attendedTalks: [1, 3, 4, 6, 9, 10, 13, 17],
    registrationDate: '2020-02-10',
    semester: '10mo Ciclo',
    status: 'Activo',
    gpa: 9.2,
    profileImage: null
  },
  {
    id: 3,
    carnet: '2022078',
    name: 'Carlos Alberto López Hernández',
    career: 'Derecho',
    completedTalks: 10,
    requiredTalks: CARRERAS['Derecho'].requiredTalks,
    email: 'carlos.lopez@universidad.edu.sv',
    phone: '+503 7555-3456',
    attendedTalks: [1, 2, 4, 5, 6, 7, 8, 9, 11, 12],
    registrationDate: '2022-02-20',
    semester: '4to Ciclo',
    status: 'Graduado',
    gpa: 8.8,
    profileImage: null
  },
  {
    id: 4,
    carnet: '2021156',
    name: 'Ana Sofía Martínez Flores',
    career: 'Administración',
    completedTalks: 7,
    requiredTalks: CARRERAS['Administración'].requiredTalks,
    email: 'ana.martinez@universidad.edu.sv',
    phone: '+503 7555-4567',
    attendedTalks: [2, 3, 5, 8, 12, 15, 16],
    registrationDate: '2021-02-18',
    semester: '6to Ciclo',
    status: 'Activo',
    gpa: 8.1,
    profileImage: null
  },
  {
    id: 5,
    carnet: '2020234',
    name: 'Roberto Daniel Hernández Castro',
    career: 'Psicología',
    completedTalks: 14,
    requiredTalks: CARRERAS['Psicología'].requiredTalks,
    email: 'roberto.hernandez@universidad.edu.sv',
    phone: '+503 7555-5678',
    attendedTalks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    registrationDate: '2020-02-12',
    semester: '9no Ciclo',
    status: 'Graduado',
    gpa: 9.0,
    profileImage: null
  },
  {
    id: 6,
    carnet: '2022345',
    name: 'Lucía Fernanda Morales Vásquez',
    career: 'Arquitectura',
    completedTalks: 5,
    requiredTalks: CARRERAS['Arquitectura'].requiredTalks,
    email: 'lucia.morales@universidad.edu.sv',
    phone: '+503 7555-6789',
    attendedTalks: [1, 4, 7, 12, 18],
    registrationDate: '2022-02-25',
    semester: '3er Ciclo',
    status: 'Activo',
    gpa: 7.8,
    profileImage: null
  },
  {
    id: 7,
    carnet: '2021567',
    name: 'Diego Alejandro Ramos Quintanilla',
    career: 'Ingeniería en Sistemas',
    completedTalks: 15,
    requiredTalks: CARRERAS['Ingeniería en Sistemas'].requiredTalks,
    email: 'diego.ramos@universidad.edu.sv',
    phone: '+503 7555-7890',
    attendedTalks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    registrationDate: '2021-02-22',
    semester: '7mo Ciclo',
    status: 'Graduado',
    gpa: 8.9,
    profileImage: null
  },
  {
    id: 8,
    carnet: '2020678',
    name: 'Valentina Isabel Torres Mejía',
    career: 'Medicina',
    completedTalks: 20,
    requiredTalks: CARRERAS['Medicina'].requiredTalks,
    email: 'valentina.torres@universidad.edu.sv',
    phone: '+503 7555-8901',
    attendedTalks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    registrationDate: '2020-02-08',
    semester: '11vo Ciclo',
    status: 'Graduado',
    gpa: 9.5,
    profileImage: null
  },
  // Estudiantes adicionales para demo más rica
  {
    id: 9,
    carnet: '2023001',
    name: 'Alejandra Beatriz Ramírez Silva',
    career: 'Psicología',
    completedTalks: 2,
    requiredTalks: CARRERAS['Psicología'].requiredTalks,
    email: 'alejandra.ramirez@universidad.edu.sv',
    phone: '+503 7555-9012',
    attendedTalks: [1, 3],
    registrationDate: '2023-02-15',
    semester: '1er Ciclo',
    status: 'Activo',
    gpa: 8.0,
    profileImage: null
  },
  {
    id: 10,
    carnet: '2019123',
    name: 'Fernando José Castillo Moreno',
    career: 'Administración',
    completedTalks: 12,
    requiredTalks: CARRERAS['Administración'].requiredTalks,
    email: 'fernando.castillo@universidad.edu.sv',
    phone: '+503 7555-0123',
    attendedTalks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    registrationDate: '2019-02-10',
    semester: 'Egresado',
    status: 'Graduado',
    gpa: 8.7,
    profileImage: null
  }
];

// Charlas mockeadas con datos más atractivos para demo
const MOCK_TALKS = [
  {
    id: 1,
    title: '🤖 Inteligencia Artificial en la Medicina del Futuro',
    date: '2024-03-15',
    time: '14:00',
    location: 'Auditorio Principal "Dr. José Simeón Cañas"',
    description: 'Descubre cómo la IA está revolucionando el diagnóstico médico, desde algoritmos de detección temprana de cáncer hasta asistentes virtuales para cirugías. Una charla fascinante sobre el futuro de la medicina.',
    speaker: 'Dra. María Elena Vásquez - Especialista en IA Médica, Hospital Nacional',
    value: 2,
    attendees: 145,
    capacity: 150,
    status: 'completed',
    category: 'Tecnología & Salud',
    duration: 120,
    rating: 4.8,
    highlights: ['Casos reales', 'Demostración en vivo', 'Q&A interactivo']
  },
  {
    id: 2,
    title: 'Sostenibilidad Ambiental y Desarrollo Urbano',
    date: '2024-03-22',
    time: '10:00',
    location: 'Sala de Conferencias 201',
    description: 'Análisis de las mejores prácticas para el desarrollo urbano sostenible.',
    speaker: 'Arq. Carlos Mendoza',
    value: 1,
    attendees: 89,
    capacity: 100,
    status: 'completed',
    category: 'Medio Ambiente',
    duration: 90
  },
  {
    id: 3,
    title: 'Emprendimiento Digital en el Siglo XXI',
    date: '2024-03-28',
    time: '16:00',
    location: 'Auditorio B',
    description: 'Estrategias para crear y desarrollar startups tecnológicas exitosas.',
    speaker: 'Lic. Ana Patricia Jiménez',
    value: 1,
    attendees: 156,
    capacity: 200,
    status: 'completed',
    category: 'Emprendimiento',
    duration: 105
  },
  {
    id: 4,
    title: 'Ética Profesional en el Siglo Digital',
    date: '2024-04-05',
    time: '09:00',
    location: 'Aula Magna',
    description: 'Reflexiones sobre los dilemas éticos en la era de la transformación digital.',
    speaker: 'Dr. Francisco Rodríguez',
    value: 2,
    attendees: 234,
    capacity: 300,
    status: 'completed',
    category: 'Ética',
    duration: 180
  },
  {
    id: 5,
    title: 'Innovación en Metodologías de Enseñanza',
    date: '2024-04-12',
    time: '15:30',
    location: 'Sala Polivalente',
    description: 'Nuevas técnicas pedagógicas para la educación superior moderna.',
    speaker: 'Dra. Sofía Guerrero',
    value: 1,
    attendees: 78,
    capacity: 80,
    status: 'completed',
    category: 'Educación',
    duration: 75
  },
  {
    id: 6,
    title: 'Transformación Digital en las Empresas',
    date: '2024-04-18',
    time: '14:00',
    location: 'Centro de Innovación',
    description: 'Cómo las empresas pueden adaptarse a la era digital.',
    speaker: 'Ing. Roberto Castillo',
    value: 1,
    attendees: 142,
    capacity: 150,
    status: 'completed',
    category: 'Tecnología',
    duration: 110
  },
  {
    id: 7,
    title: 'Salud Mental en Estudiantes Universitarios',
    date: '2024-04-25',
    time: '11:00',
    location: 'Auditorio de Medicina',
    description: 'Estrategias para mantener el bienestar psicológico durante los estudios.',
    speaker: 'Psic. Laura Montes',
    value: 1,
    attendees: 189,
    capacity: 200,
    status: 'completed',
    category: 'Salud',
    duration: 85
  },
  {
    id: 8,
    title: 'Liderazgo y Gestión de Equipos',
    date: '2024-05-02',
    time: '16:30',
    location: 'Sala Ejecutiva',
    description: 'Desarrollo de habilidades de liderazgo para profesionales jóvenes.',
    speaker: 'Lic. Miguel Herrera',
    value: 1,
    attendees: 67,
    capacity: 70,
    status: 'completed',
    category: 'Liderazgo',
    duration: 95
  },
  {
    id: 9,
    title: 'Derechos Humanos en la Era Digital',
    date: '2024-05-09',
    time: '13:00',
    location: 'Facultad de Derecho',
    description: 'Análisis de los desafíos legales en el mundo digital.',
    speaker: 'Dr. Antonio Villanueva',
    value: 2,
    attendees: 156,
    capacity: 180,
    status: 'completed',
    category: 'Derecho',
    duration: 135
  },
  {
    id: 10,
    title: 'Investigación Científica y Metodología',
    date: '2024-05-16',
    time: '10:30',
    location: 'Laboratorio de Investigación',
    description: 'Principios fundamentales para la investigación académica de calidad.',
    speaker: 'Dra. Patricia Sandoval',
    value: 1,
    attendees: 92,
    capacity: 100,
    status: 'completed',
    category: 'Investigación',
    duration: 120
  },
  {
    id: 11,
    title: 'Marketing Digital y Redes Sociales',
    date: '2024-05-23',
    time: '15:00',
    location: 'Aula de Multimedia',
    description: 'Estrategias efectivas para el marketing en plataformas digitales.',
    speaker: 'Lic. Carmen Delgado',
    value: 1,
    attendees: 178,
    capacity: 200,
    status: 'completed',
    category: 'Marketing',
    duration: 100
  },
  {
    id: 12,
    title: 'Arquitectura Sostenible del Futuro',
    date: '2024-05-30',
    time: '09:30',
    location: 'Facultad de Arquitectura',
    description: 'Diseño arquitectónico enfocado en la sostenibilidad ambiental.',
    speaker: 'Arq. Elena Ruiz',
    value: 1,
    attendees: 145,
    capacity: 160,
    status: 'completed',
    category: 'Arquitectura',
    duration: 115
  },
  {
    id: 13,
    title: 'Finanzas Personales para Jóvenes Profesionales',
    date: '2024-06-06',
    time: '17:00',
    location: 'Auditorio de Administración',
    description: 'Gestión financiera inteligente para recién graduados.',
    speaker: 'Lic. Fernando Aguilar',
    value: 1,
    attendees: 203,
    capacity: 250,
    status: 'completed',
    category: 'Finanzas',
    duration: 90
  },
  {
    id: 14,
    title: 'Ciberseguridad: Protegiendo el Futuro Digital',
    date: '2024-06-13',
    time: '14:30',
    location: 'Centro Tecnológico',
    description: 'Fundamentos de la seguridad informática en el mundo actual.',
    speaker: 'Ing. Ricardo Espinoza',
    value: 2,
    attendees: 167,
    capacity: 180,
    status: 'completed',
    category: 'Tecnología',
    duration: 150
  },
  {
    id: 15,
    title: 'Comunicación Efectiva en el Ámbito Profesional',
    date: '2024-06-20',
    time: '11:30',
    location: 'Sala de Comunicaciones',
    description: 'Técnicas de comunicación para el éxito profesional.',
    speaker: 'Lic. Gabriela Moreno',
    value: 1,
    attendees: 134,
    capacity: 150,
    status: 'completed',
    category: 'Comunicación',
    duration: 80
  },
  {
    id: 16,
    title: 'Biotecnología y Medicina del Futuro',
    date: '2024-06-27',
    time: '16:00',
    location: 'Laboratorio de Biotecnología',
    description: 'Avances en biotecnología aplicada a la medicina moderna.',
    speaker: 'Dr. Andrés Campos',
    value: 2,
    attendees: 98,
    capacity: 120,
    status: 'completed',
    category: 'Medicina',
    duration: 140
  },
  {
    id: 17,
    title: 'Globalización y Relaciones Internacionales',
    date: '2024-07-04',
    time: '10:00',
    location: 'Auditorio Internacional',
    description: 'El papel de las relaciones internacionales en el mundo globalizado.',
    speaker: 'Dr. Manuel Córdoba',
    value: 1,
    attendees: 156,
    capacity: 200,
    status: 'completed',
    category: 'Relaciones Internacionales',
    duration: 105
  },
  {
    id: 18,
    title: 'Arte y Cultura en la Sociedad Contemporánea',
    date: '2024-07-11',
    time: '15:00',
    location: 'Centro Cultural',
    description: 'El impacto del arte y la cultura en la sociedad actual.',
    speaker: 'Maestra Isabel Vega',
    value: 1,
    attendees: 89,
    capacity: 100,
    status: 'completed',
    category: 'Arte y Cultura',
    duration: 95
  },
  {
    id: 19,
    title: 'Gestión de Proyectos con Metodologías Ágiles',
    date: '2024-07-18',
    time: '13:30',
    location: 'Sala de Proyectos',
    description: 'Implementación de metodologías ágiles en la gestión de proyectos.',
    speaker: 'Ing. Pablo Martín',
    value: 1,
    attendees: 112,
    capacity: 130,
    status: 'upcoming',
    category: 'Gestión',
    duration: 110
  },
  {
    id: 20,
    title: 'Neurociencia y Comportamiento Humano',
    date: '2024-07-25',
    time: '09:00',
    location: 'Instituto de Neurociencias',
    description: 'Descubrimientos recientes en neurociencia aplicada al comportamiento.',
    speaker: 'Dr. Leonardo Serrano',
    value: 2,
    attendees: 0,
    capacity: 150,
    status: 'upcoming',
    category: 'Neurociencia',
    duration: 160
  }
];

// Datos de asistencia actual (para la simulación de escaneo)
let CURRENT_ATTENDANCE = [];

// Usuario Coordinador mockeado
const MOCK_COORDINATOR = {
  id: 1,
  name: 'Prof. Ana María Rodríguez',
  role: 'Coordinador de Charlas',
  email: 'ana.rodriguez@universidad.edu',
  phone: '+503 7555-0001',
  department: 'Coordinación Académica',
  permissions: ['create_talks', 'manage_attendance', 'view_reports', 'export_data'],
  lastLogin: '2024-07-15T08:30:00',
  isActive: true
};

// Configuración del sistema
const SYSTEM_CONFIG = {
  appName: 'Samanta',
  version: '1.0.0',
  university: 'Universidad Ejemplo',
  academicYear: '2024',
  currentSemester: 'I-2024',
  attendanceSessionId: null,
  scanMode: 'manual', // 'manual' o 'automatic'
  allowDuplicateScans: false,
  requiresStudentValidation: true,
  coordinator: MOCK_COORDINATOR
};

// Función para generar datos estadísticos
function generateStats() {
  const totalStudents = MOCK_STUDENTS.length;
  const totalTalks = MOCK_TALKS.filter(talk => talk.status === 'completed').length;
  const activeStudents = MOCK_STUDENTS.filter(student => 
    student.completedTalks > 0
  ).length;
  
  return {
    totalStudents,
    totalTalks,
    activeStudents,
    completionRate: Math.round((activeStudents / totalStudents) * 100),
    averageAttendance: Math.round(
      MOCK_STUDENTS.reduce((sum, student) => sum + student.completedTalks, 0) / totalStudents
    )
  };
}

// Función para obtener estudiante por carnet
function getStudentByCarnet(carnet) {
  return MOCK_STUDENTS.find(student => student.carnet === carnet);
}

// Función para validar si un estudiante puede asistir a una charla
function canStudentAttendTalk(studentId, talkId) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  const talk = MOCK_TALKS.find(t => t.id === talkId);
  
  if (!student || !talk) return false;
  
  // Verificar si ya asistió a esta charla
  if (student.attendedTalks.includes(talkId)) return false;
  
  // Verificar capacidad de la charla
  if (talk.attendees >= talk.capacity) return false;
  
  return true;
}

// Función para registrar asistencia
function registerAttendance(carnet, talkId = null) {
  const student = getStudentByCarnet(carnet);
  
  if (!student) {
    return {
      success: false,
      message: `No se encontró el estudiante con carnet: ${carnet}`,
      type: 'error'
    };
  }

  // Verificar si ya está en la lista de asistencia actual
  const alreadyScanned = CURRENT_ATTENDANCE.find(att => att.carnet === carnet);
  if (alreadyScanned && !SYSTEM_CONFIG.allowDuplicateScans) {
    return {
      success: false,
      message: `El estudiante ${student.name} ya fue registrado`,
      type: 'warning'
    };
  }

  // Agregar a la asistencia actual
  if (!alreadyScanned) {
    CURRENT_ATTENDANCE.push({
      carnet: student.carnet,
      name: student.name,
      career: student.career,
      timestamp: new Date().toLocaleString()
    });
  }

  return {
    success: true,
    message: `✓ ${student.name} registrado correctamente`,
    type: 'success',
    student: student
  };
}

// Función para limpiar asistencia actual
function clearCurrentAttendance() {
  CURRENT_ATTENDANCE = [];
}

// === FUNCIONES ESPECÍFICAS FASE 4 ===

// Obtener charlas completadas
function getCompletedTalks() {
  return MOCK_TALKS.filter(talk => talk.status === 'completed');
}

// Obtener charlas próximas
function getUpcomingTalks() {
  return MOCK_TALKS.filter(talk => talk.status === 'upcoming');
}

// Función para obtener el estado de cumplimiento de un estudiante
function getStudentStatus(student) {
  const percentage = (student.completedTalks / student.requiredTalks) * 100;
  
  if (percentage >= 100) return 'completed';
  if (percentage >= 75) return 'on-track';
  if (percentage >= 50) return 'behind';
  return 'critical';
}

// Función para obtener el texto del estado
function getStatusText(student) {
  const status = getStudentStatus(student);
  const statusTexts = {
    'completed': 'Completado',
    'on-track': 'En progreso',
    'behind': 'Atrasado',
    'critical': 'Crítico'
  };
  return statusTexts[status];
}

// Función para obtener la clase CSS del estado
function getStatusClass(student) {
  const status = getStudentStatus(student);
  const statusClasses = {
    'completed': 'badge--success',
    'on-track': 'badge--info',
    'behind': 'badge--warning',
    'critical': 'badge--danger'
  };
  return statusClasses[status];
}

// Función para formatear fechas
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// === FUNCIONES DE UTILIDAD ESPECÍFICAS FASE 2 ===

// Función para buscar estudiante por carnet (nombre específico requerido)
function buscarEstudiantePorCarnet(carnet) {
  return MOCK_STUDENTS.find(student => student.carnet === carnet);
}

// Función para obtener estado del estudiante (nombre específico requerido)
function obtenerEstadoEstudiante(estudiante) {
  const percentage = (estudiante.completedTalks / estudiante.requiredTalks) * 100;
  
  if (percentage >= 100) return 'completed';
  if (percentage >= 75) return 'on-track';
  if (percentage >= 50) return 'behind';
  return 'critical';
}

// Función para calcular progreso (nueva función requerida)
function calcularProgreso(asistidas, requeridas) {
  if (requeridas === 0) return 0;
  
  const percentage = Math.round((asistidas / requeridas) * 100);
  
  return {
    percentage: Math.min(100, percentage),
    completed: asistidas,
    required: requeridas,
    remaining: Math.max(0, requeridas - asistidas),
    status: percentage >= 100 ? 'completed' : 
            percentage >= 75 ? 'on-track' : 
            percentage >= 50 ? 'behind' : 'critical',
    isCompleted: percentage >= 100,
    progressBar: {
      width: Math.min(100, percentage),
      color: percentage >= 100 ? 'success' : 
             percentage >= 75 ? 'info' : 
             percentage >= 50 ? 'warning' : 'danger'
    }
  };
}

// Función para formatear fecha (alias con nombre específico requerido)
function formatearFecha(fecha) {
  return formatDate(fecha);
}

// Exportar para uso global (simulando un módulo)
window.MOCK_DATA = {
  // Datos principales
  CARRERAS,
  MOCK_STUDENTS,
  MOCK_TALKS,
  MOCK_COORDINATOR,
  CURRENT_ATTENDANCE,
  SYSTEM_CONFIG,
  
  // Funciones existentes
  generateStats,
  getStudentByCarnet,
  canStudentAttendTalk,
  registerAttendance,
  clearCurrentAttendance,
  getStudentStatus,
  getStatusText,
  getStatusClass,
  formatDate,
  
  // Funciones específicas Fase 2
  buscarEstudiantePorCarnet,
  obtenerEstadoEstudiante,
  calcularProgreso,
  formatearFecha,
  
  // Funciones específicas Fase 4
  getCompletedTalks,
  getUpcomingTalks
}; 