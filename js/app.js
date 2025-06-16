/* ============================================================================
   APLICACIÓN PRINCIPAL - SISTEMA PUCMMTUB
   Vue.js Application para gestión de asistencia a charlas universitarias
============================================================================ */

// Configuración de la aplicación Vue
const { createApp, ref, computed, onMounted, nextTick } = Vue;

// Crear la aplicación principal
const app = createApp({
  setup() {
    // === ESTADO REACTIVO ===
    
    // Sistema de routing y navegación
    const currentRoute = ref('login');
    const currentView = ref('dashboard');
    const currentUserRole = ref(null); // 'coordinator' | 'student'
    const currentUser = ref(null);
    const selectedStudentCarnet = ref('');
    
    // Datos del sistema
    const appName = ref(window.MOCK_DATA.SYSTEM_CONFIG.appName);
    const students = ref([...window.MOCK_DATA.MOCK_STUDENTS]);
    const talks = ref([...window.MOCK_DATA.MOCK_TALKS]);
    const currentAttendance = ref([...window.MOCK_DATA.CURRENT_ATTENDANCE]);
    
    // Estado del escáner de carnets
    const scanInput = ref('');
    const scanResult = ref(null);
    const isScanning = ref(false);
    
    // Estado de loading
    const isLoading = ref(false);
    
    // === ESTADO ESPECÍFICO FASE 4: DASHBOARD DEL COORDINADOR ===
    
    // Estado para búsqueda de estudiantes
    const studentSearchQuery = ref('');
    const searchResults = ref([]);
    
    // Estado para crear nueva charla
    const showCreateTalkModal = ref(false);
    const newTalk = ref({
      title: '',
      date: '',
      time: '',
      location: '',
      speaker: '',
      capacity: 100,
      value: 1,
      description: '',
      category: 'Tecnología'
    });
    const formErrors = ref({});
    const isCreatingTalk = ref(false);
    
    // Estado para detalles de charla
    const showTalkDetailsModal = ref(false);
    const selectedTalk = ref(null);
    
    // Estado para tomar asistencia
    const currentTalkForAttendance = ref(null);
    
    // === ESTADO ESPECÍFICO FASE 5: DASHBOARD DEL ESTUDIANTE ===
    
    // Estado para navegación de secciones del estudiante
    const currentStudentSection = ref('historial');
    
    // === ESTADO ESPECÍFICO FASE 6: COMPONENTES VUE INTERACTIVOS ===
    
    // Estado del componente Login
    const loginState = ref({
      selectedRole: null, // 'coordinator' | 'student'
      isTransitioning: false,
      showStudentSelection: false,
      validationError: null
    });
    
    // Estado del componente Búsqueda
    const searchState = ref({
      isSearching: false,
      hasSearched: false,
      debounceTimer: null
    });
    
    // Estado de carga global
    const loadingStates = ref({
      creatingTalk: false,
      processingAttendance: false,
      loadingStudentData: false,
      savingChanges: false
    });
    
    // === ESTADO ESPECÍFICO FASE 7: SIMULACIÓN DE INTERACCIONES ===
    
    // Sistema de notificaciones toast
    const notifications = ref([]);
    let notificationId = 0;
    
    // Estado de persistencia
    const persistenceState = ref({
      isEnabled: true,
      lastSaved: null,
      autoSave: true
    });
    
    // Configuración de localStorage
    const STORAGE_KEYS = {
      STUDENTS: 'samanta_students',
      TALKS: 'samanta_talks',
      ATTENDANCE: 'samanta_attendance',
      USER_SESSION: 'samanta_user_session',
      APP_STATE: 'samanta_app_state'
    };
    
    // === VISTAS DISPONIBLES ===
    
    // Vistas para coordinador
    const coordinatorViews = ref([
      { id: 'dashboard', name: 'Dashboard', icon: '📊', route: '#coordinador' },
      { id: 'students', name: 'Estudiantes', icon: '👥', route: '#coordinador/estudiantes' },
      { id: 'talks', name: 'Charlas', icon: '🎤', route: '#coordinador/charlas' },
      { id: 'scan', name: 'Escaneo', icon: '📱', route: '#coordinador/escaneo' }
    ]);
    
    // Vistas para estudiante
    const studentViews = ref([
      { id: 'progress', name: 'Mi Progreso', icon: '📈', route: '#estudiante/progreso' },
      { id: 'talks', name: 'Charlas Disponibles', icon: '🎤', route: '#estudiante/charlas' }
    ]);
    
    // Estudiantes para demostración rápida
    const demoStudents = computed(() => {
      return students.value.slice(0, 4).map(student => ({
        carnet: student.carnet,
        name: student.name.split(' ')[0] + ' ' + student.name.split(' ')[1]
      }));
    });

    // === PROPIEDADES COMPUTADAS ===
    
    // Información del usuario actual
    const currentUserType = computed(() => {
      if (currentUserRole.value === 'coordinator') return 'Coordinador';
      if (currentUserRole.value === 'student') return 'Estudiante';
      return '';
    });
    
    const currentUserName = computed(() => {
      if (currentUserRole.value === 'coordinator') {
        return window.MOCK_DATA.MOCK_COORDINATOR.name;
      }
      if (currentUserRole.value === 'student' && currentUser.value) {
        return currentUser.value.name;
      }
      return '';
    });
    
    // Estadísticas del dashboard
    const stats = computed(() => {
      return window.MOCK_DATA.generateStats();
    });
    
    // Número de estudiantes activos
    const activeStudentsCount = computed(() => {
      return students.value.filter(student => student.completedTalks > 0).length;
    });
    
    // Charlas completadas
    const completedTalks = computed(() => {
      return window.MOCK_DATA.getCompletedTalks();
    });
    
    // Charlas próximas
    const upcomingTalks = computed(() => {
      return window.MOCK_DATA.getUpcomingTalks();
    });
    
    // Estudiantes por estado
    const studentsByStatus = computed(() => {
      const statusCounts = {
        completed: 0,
        'on-track': 0,
        behind: 0,
        critical: 0
      };
      
      students.value.forEach(student => {
        const status = window.MOCK_DATA.getStudentStatus(student);
        statusCounts[status]++;
      });
      
      return statusCounts;
    });
    
    // === PROPIEDADES COMPUTADAS ESPECÍFICAS FASE 4 ===
    
    // Contador de asistencias de hoy (simulado)
    const todayAttendanceCount = computed(() => {
      // Simular asistencias del día actual
      const today = new Date().toISOString().split('T')[0];
      return talks.value
        .filter(talk => talk.date === today && talk.status === 'completed')
        .reduce((total, talk) => total + talk.attendees, 0);
    });

    // === MÉTODOS ===
    
    // === SISTEMA DE ROUTING ===
    
    // Función para navegar a una ruta específica
    const navigateTo = (route) => {
      window.location.hash = route;
      handleRouteChange();
    };
    
    // Manejar cambios de ruta
    const handleRouteChange = () => {
      const hash = window.location.hash;
      
      if (!hash || hash === '#' || hash === '#login') {
        currentRoute.value = 'login';
        return;
      }
      
      // Rutas del coordinador
      if (hash.startsWith('#coordinador')) {
        if (currentUserRole.value !== 'coordinator') {
          navigateTo('#login');
          return;
        }
        
        currentRoute.value = 'app';
        
        if (hash === '#coordinador') {
          currentView.value = 'dashboard';
        } else if (hash === '#coordinador/estudiantes') {
          currentView.value = 'students';
        } else if (hash === '#coordinador/charlas') {
          currentView.value = 'talks';
        } else if (hash === '#coordinador/escaneo') {
          currentView.value = 'scan';
        }
      }
      
      // Rutas del estudiante
      else if (hash.startsWith('#estudiante')) {
        if (currentUserRole.value !== 'student') {
          navigateTo('#login');
          return;
        }
        
        currentRoute.value = 'app';
        
        if (hash === '#estudiante/progreso') {
          currentView.value = 'progress';
        } else if (hash === '#estudiante/charlas') {
          currentView.value = 'talks';
        }
        
        // Extraer carnet de la ruta si está presente
        const carnetMatch = hash.match(/#estudiante\/(.+)/);
        if (carnetMatch && carnetMatch[1] !== 'progreso' && carnetMatch[1] !== 'charlas') {
          const carnet = carnetMatch[1];
          const student = window.MOCK_DATA.buscarEstudiantePorCarnet(carnet);
          if (student && currentUser.value?.carnet === carnet) {
            currentView.value = 'progress';
          }
        }
      }
      
      // Limpiar resultados de escaneo al cambiar de vista
      if (currentView.value !== 'scan') {
        scanResult.value = null;
        scanInput.value = '';
      }
    };
    
    // === FUNCIONES DE LOGIN MEJORADAS (Paso 6.1) ===
    
    // Seleccionar rol con transición
    const selectRole = async (role) => {
      if (loginState.value.isTransitioning) return;
      
      loginState.value.isTransitioning = true;
      loginState.value.validationError = null;
      
      // Simular transición suave
      await new Promise(resolve => setTimeout(resolve, 300));
      
      loginState.value.selectedRole = role;
      
      if (role === 'student') {
        loginState.value.showStudentSelection = true;
      }
      
      loginState.value.isTransitioning = false;
    };
    
    // Validar selección de estudiante
    const validateStudentSelection = () => {
      if (!selectedStudentCarnet.value) {
        loginState.value.validationError = 'Por favor selecciona un estudiante';
        return false;
      }
      
      const student = window.MOCK_DATA.buscarEstudiantePorCarnet(selectedStudentCarnet.value);
      if (!student) {
        loginState.value.validationError = 'Estudiante no encontrado';
        return false;
      }
      
      loginState.value.validationError = null;
      return true;
    };
    
    // Login como coordinador con transición
    const loginAsCoordinator = async () => {
      if (loginState.value.isTransitioning) return;
      
      loginState.value.isTransitioning = true;
      loadingStates.value.loadingStudentData = true;
      
      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 800));
        
        currentUserRole.value = 'coordinator';
        currentUser.value = window.MOCK_DATA.MOCK_COORDINATOR;
        
        // Resetear estado de login
        resetLoginState();
        
        navigateTo('#coordinador');
      } catch (error) {
        loginState.value.validationError = 'Error al iniciar sesión';
      } finally {
        loadingStates.value.loadingStudentData = false;
        loginState.value.isTransitioning = false;
      }
    };
    
    // Login como estudiante con validación
    const loginAsStudent = async () => {
      if (loginState.value.isTransitioning) return;
      
      if (!validateStudentSelection()) return;
      
      loginState.value.isTransitioning = true;
      loadingStates.value.loadingStudentData = true;
      
      try {
        // Simular carga de datos del estudiante
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const student = window.MOCK_DATA.buscarEstudiantePorCarnet(selectedStudentCarnet.value);
        
        currentUserRole.value = 'student';
        currentUser.value = student;
        
        // Resetear estado de login
        resetLoginState();
        
        navigateTo(`#estudiante/${student.carnet}`);
      } catch (error) {
        loginState.value.validationError = 'Error al cargar datos del estudiante';
      } finally {
        loadingStates.value.loadingStudentData = false;
        loginState.value.isTransitioning = false;
      }
    };
    
    // Resetear estado de login
    const resetLoginState = () => {
      loginState.value = {
        selectedRole: null,
        isTransitioning: false,
        showStudentSelection: false,
        validationError: null
      };
      selectedStudentCarnet.value = '';
    };
    
    // Login rápido como coordinador (demo)
    const quickLoginCoordinator = () => {
      selectRole('coordinator').then(() => {
        loginAsCoordinator();
      });
    };
    
    // Login rápido como estudiante (demo)
    const quickLoginStudent = (carnet) => {
      selectRole('student').then(() => {
        selectedStudentCarnet.value = carnet;
        loginAsStudent();
      });
    };
    
    // Cerrar sesión
    const logout = () => {
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        currentUserRole.value = null;
        currentUser.value = null;
        selectedStudentCarnet.value = '';
        currentView.value = 'dashboard';
        navigateTo('#login');
      }
    };
    
    // Cambiar vista actual (función legacy mantenida para compatibilidad)
    const changeView = (viewId) => {
      currentView.value = viewId;
      
      // Limpiar resultados de escaneo al cambiar de vista
      if (viewId !== 'scan') {
        scanResult.value = null;
        scanInput.value = '';
      }
    };
    
    // Obtener clase CSS para el estado del estudiante
    const getStatusClass = (student) => {
      return window.MOCK_DATA.getStatusClass(student);
    };
    
    // Obtener texto del estado del estudiante
    const getStatusText = (student) => {
      return window.MOCK_DATA.getStatusText(student);
    };
    
    // Formatear fecha
    const formatDate = (dateString) => {
      return window.MOCK_DATA.formatDate(dateString);
    };
    
    // === FUNCIONALIDAD DE ESCANEO ===
    
    // Procesar carnet escaneado con estados mejorados (Paso 6.2)
    const processCarnet = async () => {
      if (!scanInput.value.trim()) {
        scanResult.value = {
          success: false,
          message: 'Por favor ingrese un número de carnet válido',
          type: 'warning'
        };
        return;
      }

      // Estados de carga múltiples
      isScanning.value = true;
      loadingStates.value.processingAttendance = true;
      
      try {
        // Simular delay de proceso de escaneo
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Buscar estudiante por carnet
        const student = window.MOCK_DATA.buscarEstudiantePorCarnet(scanInput.value.trim());
        
        if (student) {
          // Agregar a la lista de asistencia actual
          const attendanceRecord = {
            studentId: student.id,
            studentName: student.name,
            carnet: student.carnet,
            timestamp: new Date().toISOString(),
            talkId: currentTalkForAttendance.value?.id || null
          };
          
          currentAttendance.value.push(attendanceRecord);
          
          // Sincronizar datos si hay una charla activa
          if (currentTalkForAttendance.value) {
            const synced = syncAttendanceData(student.carnet, currentTalkForAttendance.value.id);
            if (!synced) {
              // Si falla la sincronización, remover de asistencia actual
              currentAttendance.value.pop();
              return;
            }
          } else {
            showSuccess(`✅ Asistencia registrada: ${student.name} (${student.carnet})`, 3000);
          }
          
          scanResult.value = {
            success: true,
            message: `✅ Asistencia registrada: ${student.name} (${student.carnet})`,
            student: student,
            type: 'success'
          };
          
          // Limpiar input después de éxito
          scanInput.value = '';
          
          // Auto-limpiar el mensaje después de 3 segundos
          setTimeout(() => {
            if (scanResult.value && scanResult.value.type === 'success') {
              scanResult.value = null;
            }
          }, 3000);
        } else {
          scanResult.value = {
            success: false,
            message: `❌ Estudiante no encontrado: ${scanInput.value}`,
            type: 'error'
          };
          showError(`Estudiante no encontrado: ${scanInput.value}`);
        }
        
      } catch (error) {
        console.error('Error al procesar carnet:', error);
        scanResult.value = {
          success: false,
          message: 'Error interno del sistema. Intente nuevamente.',
          type: 'error'
        };
      } finally {
        isScanning.value = false;
        loadingStates.value.processingAttendance = false;
      }
    };
    
    // Limpiar asistencia actual
    const clearAttendance = () => {
      if (confirm('¿Está seguro de que desea limpiar la lista de asistencia actual?')) {
        window.MOCK_DATA.clearCurrentAttendance();
        currentAttendance.value = [];
        scanResult.value = {
          success: true,
          message: 'Lista de asistencia limpiada correctamente',
          type: 'info'
        };
        
        setTimeout(() => {
          scanResult.value = null;
        }, 2000);
      }
    };
    
    // === FUNCIONALIDAD DE ESTUDIANTES ===
    
    // Obtener progreso del estudiante como porcentaje
    const getStudentProgress = (student) => {
      return Math.min(100, Math.round((student.completedTalks / student.requiredTalks) * 100));
    };
    
    // Filtrar estudiantes por búsqueda
    const filterStudents = (searchTerm) => {
      if (!searchTerm.trim()) return students.value;
      
      const term = searchTerm.toLowerCase();
      return students.value.filter(student => 
        student.name.toLowerCase().includes(term) ||
        student.carnet.includes(term) ||
        student.career.toLowerCase().includes(term)
      );
    };
    
    // === FUNCIONALIDAD DE CHARLAS ===
    
    // Obtener estadísticas de una charla
    const getTalkStats = (talk) => {
      const occupancyRate = Math.round((talk.attendees / talk.capacity) * 100);
      return {
        occupancyRate,
        availableSpots: talk.capacity - talk.attendees,
        isFullyBooked: talk.attendees >= talk.capacity
      };
    };
    
    // Obtener categorías únicas de charlas
    const getTalkCategories = () => {
      const categories = [...new Set(talks.value.map(talk => talk.category))];
      return categories.sort();
    };
    
    // === FUNCIONALIDADES ESPECÍFICAS FASE 4 ===
    
    // === BÚSQUEDA DE ESTUDIANTES MEJORADA (Paso 6.3) ===
    
    // Buscar estudiantes con debounce y estados
    const searchStudents = () => {
      // Limpiar timer anterior
      if (searchState.value.debounceTimer) {
        clearTimeout(searchState.value.debounceTimer);
      }
      
      if (!studentSearchQuery.value.trim()) {
        searchResults.value = [];
        searchState.value.hasSearched = false;
        searchState.value.isSearching = false;
        return;
      }
      
      // Mostrar estado de búsqueda
      searchState.value.isSearching = true;
      searchState.value.hasSearched = false;
      
      // Implementar debounce de 300ms
      searchState.value.debounceTimer = setTimeout(() => {
        performSearch();
      }, 300);
    };
    
    // Realizar búsqueda real
    const performSearch = async () => {
      try {
        // Usar la nueva función con feedback
        const results = await searchStudentWithFeedback(studentSearchQuery.value);
        
        searchResults.value = results;
        searchState.value.hasSearched = true;
        searchState.value.isSearching = false;
        
      } catch (error) {
        console.error('Error en búsqueda:', error);
        searchState.value.isSearching = false;
        searchState.value.hasSearched = true;
        searchResults.value = [];
        showError('Error al realizar la búsqueda');
      }
    };
    
    // Limpiar búsqueda con reset de estados
    const clearSearch = () => {
      if (searchState.value.debounceTimer) {
        clearTimeout(searchState.value.debounceTimer);
      }
      
      studentSearchQuery.value = '';
      searchResults.value = [];
      searchState.value.isSearching = false;
      searchState.value.hasSearched = false;
    };
    
    // Estado de búsqueda computado
    const searchStatus = computed(() => {
      if (searchState.value.isSearching) return 'searching';
      if (searchState.value.hasSearched && searchResults.value.length > 0) return 'found';
      if (searchState.value.hasSearched && searchResults.value.length === 0) return 'not-found';
      return 'idle';
    });
    
    // === PROPIEDADES COMPUTADAS ESPECÍFICAS FASE 6 ===
    
    // Estado global de carga
    const isAnyLoading = computed(() => {
      return Object.values(loadingStates.value).some(state => state) || 
             isScanning.value || 
             isCreatingTalk.value ||
             loginState.value.isTransitioning;
    });
    
    // Mensaje de estado de carga
    const loadingMessage = computed(() => {
      if (loadingStates.value.creatingTalk) return 'Creando charla...';
      if (loadingStates.value.processingAttendance) return 'Procesando asistencia...';
      if (loadingStates.value.loadingStudentData) return 'Cargando datos...';
      if (loadingStates.value.savingChanges) return 'Guardando cambios...';
      if (loginState.value.isTransitioning) return 'Iniciando sesión...';
      if (isScanning.value) return 'Escaneando carnet...';
      if (isCreatingTalk.value) return 'Creando charla...';
      return 'Cargando...';
    });
    
    // Estado de progreso del estudiante con animación
    const studentProgressAnimated = computed(() => {
      if (!currentUser.value) return 0;
      
      const progress = getStudentProgress(currentUser.value);
      return {
        percentage: progress,
        isComplete: progress >= 100,
        colorClass: getProgressColorClass(currentUser.value),
        animationDelay: Math.min(progress * 20, 2000) // Máximo 2 segundos
      };
    });
    
    // === GESTIÓN DE CHARLAS ===
    
    // Abrir modal para crear nueva charla
    const openCreateTalkModal = () => {
      // Resetear formulario
      newTalk.value = {
        title: '',
        date: '',
        time: '',
        location: '',
        speaker: '',
        capacity: 100,
        value: 1,
        description: '',
        category: 'Tecnología'
      };
      formErrors.value = {};
      showCreateTalkModal.value = true;
    };
    
    // Cerrar modal de crear charla
    const closeCreateTalkModal = () => {
      showCreateTalkModal.value = false;
      formErrors.value = {};
    };
    
    // Validar formulario de nueva charla
    const validateTalkForm = () => {
      const errors = {};
      
      if (!newTalk.value.title.trim()) {
        errors.title = 'El nombre de la charla es requerido';
      } else if (newTalk.value.title.length < 5) {
        errors.title = 'El nombre debe tener al menos 5 caracteres';
      }
      
      if (!newTalk.value.date) {
        errors.date = 'La fecha es requerida';
      } else {
        const selectedDate = new Date(newTalk.value.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          errors.date = 'La fecha no puede ser anterior a hoy';
        }
      }
      
      if (!newTalk.value.time) {
        errors.time = 'La hora es requerida';
      }
      
      if (!newTalk.value.location.trim()) {
        errors.location = 'La ubicación es requerida';
      }
      
      if (!newTalk.value.speaker.trim()) {
        errors.speaker = 'El ponente es requerido';
      }
      
      if (!newTalk.value.capacity || newTalk.value.capacity < 1) {
        errors.capacity = 'La capacidad debe ser mayor a 0';
      } else if (newTalk.value.capacity > 1000) {
        errors.capacity = 'La capacidad no puede ser mayor a 1000';
      }
      
      if (!newTalk.value.value || newTalk.value.value < 1) {
        errors.value = 'El valor debe ser mayor a 0';
      }
      
      formErrors.value = errors;
      return Object.keys(errors).length === 0;
    };
    
    // Crear nueva charla con estados de carga mejorados (Paso 6.2)
    const createNewTalk = async () => {
      if (!validateTalkForm()) {
        return;
      }
      
      // Estados de carga múltiples
      isCreatingTalk.value = true;
      loadingStates.value.creatingTalk = true;
      loadingStates.value.savingChanges = true;
      
      try {
        // Fase 1: Validación
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Fase 2: Creación
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generar ID único
        const newId = Math.max(...talks.value.map(t => t.id)) + 1;
        
        // Crear objeto de charla
        const talkToCreate = {
          id: newId,
          title: newTalk.value.title.trim(),
          date: newTalk.value.date,
          time: newTalk.value.time,
          location: newTalk.value.location.trim(),
          description: newTalk.value.description.trim() || `Charla sobre ${newTalk.value.title}`,
          speaker: newTalk.value.speaker.trim(),
          value: newTalk.value.value,
          attendees: 0,
          capacity: newTalk.value.capacity,
          status: 'upcoming',
          category: newTalk.value.category,
          duration: 90 // Duración por defecto
        };
        
        // Fase 3: Guardar
        loadingStates.value.savingChanges = true;
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Usar la nueva función de creación con sincronización
        const createdTalk = await createTalkWithSync(talkToCreate);
        
        if (createdTalk) {
          // Cerrar modal con transición
          await closeCreateTalkModal();
          
          // La notificación ya se muestra en createTalkWithSync
        } else {
          throw new Error('No se pudo crear la charla');
        }
        
      } catch (error) {
        console.error('Error al crear charla:', error);
        showError('Error al crear la charla. Intente nuevamente.');
      } finally {
        isCreatingTalk.value = false;
        loadingStates.value.creatingTalk = false;
        loadingStates.value.savingChanges = false;
      }
    };
    
    // Ver detalles de una charla
    const viewTalkDetails = (talk) => {
      selectedTalk.value = talk;
      showTalkDetailsModal.value = true;
    };
    
    // Cerrar modal de detalles
    const closeTalkDetailsModal = () => {
      showTalkDetailsModal.value = false;
      selectedTalk.value = null;
    };
    
    // Obtener asistentes por charla
    const getAttendeesByTalk = (talkId) => {
      return students.value
        .filter(student => student.attendedTalks.includes(talkId))
        .map(student => student.id);
    };
    
    // === TOMAR ASISTENCIA ===
    
    // Iniciar toma de asistencia para una charla
    const startTalkAttendance = (talk) => {
      currentTalkForAttendance.value = talk;
      
      // Limpiar asistencia actual
      window.MOCK_DATA.clearCurrentAttendance();
      currentAttendance.value = [];
      
      // Navegar a la vista de escaneo
      navigateTo('#coordinador/escaneo');
      
      // Mostrar mensaje informativo
      scanResult.value = {
        success: true,
        message: `📱 Iniciando toma de asistencia para: "${talk.title}"`,
        type: 'info'
      };
      
      setTimeout(() => {
                 scanResult.value = null;
       }, 3000);
     };
     
     // === FUNCIONALIDADES ESPECÍFICAS FASE 5: DASHBOARD DEL ESTUDIANTE ===
     
     // === NAVEGACIÓN DE SECCIONES DEL ESTUDIANTE ===
     
           // Cambiar sección del estudiante con transición (Paso 6.4)
      const setStudentSection = async (section) => {
        if (currentStudentSection.value === section) return;
        
        // Simular transición suave
        loadingStates.value.loadingStudentData = true;
        
        try {
          await new Promise(resolve => setTimeout(resolve, 200));
          currentStudentSection.value = section;
        } finally {
          loadingStates.value.loadingStudentData = false;
        }
      };
     
     // === FUNCIONES DE PROGRESO MEJORADAS ===
     
     // Obtener clase de color para la barra de progreso
     const getProgressColorClass = (student) => {
       const progress = getStudentProgress(student);
       if (progress >= 100) return 'progress-success';
       if (progress >= 75) return 'progress-info';
       if (progress >= 50) return 'progress-warning';
       return 'progress-danger';
     };
     
     // === HISTORIAL DE CHARLAS (Paso 5.2) ===
     
     // Obtener charlas asistidas ordenadas por fecha (más reciente primero)
     const getAttendedTalksOrdered = () => {
       if (!currentUser.value || !currentUser.value.attendedTalks) return [];
       
       const attendedTalks = currentUser.value.attendedTalks
         .map(talkId => talks.value.find(talk => talk.id === talkId))
         .filter(talk => talk !== undefined);
       
       // Ordenar por fecha descendente (más reciente primero)
       return attendedTalks.sort((a, b) => new Date(b.date) - new Date(a.date));
     };
     
     // === PRÓXIMAS CHARLAS (Paso 5.3) ===
     
     // Obtener charlas próximas para el estudiante
     const getUpcomingTalksForStudent = () => {
       return window.MOCK_DATA.getUpcomingTalks()
         .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordenar por fecha ascendente
     };
     
     // Verificar si el estudiante ya asistió a una charla
     const hasAttendedTalk = (talkId) => {
       if (!currentUser.value || !currentUser.value.attendedTalks) return false;
       return currentUser.value.attendedTalks.includes(talkId);
     };
     
     // Obtener estado de una charla próxima
     const getUpcomingTalkStatus = (talkId) => {
       if (hasAttendedTalk(talkId)) return 'attended';
       
       const talk = talks.value.find(t => t.id === talkId);
       if (!talk) return 'unknown';
       
       if (talk.attendees >= talk.capacity) return 'full';
       return 'available';
     };
     
     // Obtener icono para el estado de charla próxima
     const getUpcomingTalkIcon = (talkId) => {
       const status = getUpcomingTalkStatus(talkId);
       switch (status) {
         case 'attended': return '✅';
         case 'full': return '🚫';
         case 'available': return '📅';
         default: return '❓';
       }
     };
    
    // === SIMULACIÓN DE CARNETS PARA DEMO ===
    
    // Función para simular escaneo rápido con carnets de ejemplo
    const simulateQuickScan = (carnet) => {
      scanInput.value = carnet;
      processCarnet();
    };
    
    // Carnets de ejemplo para testing rápido
    const exampleCarnets = computed(() => {
      return students.value.slice(0, 4).map(student => ({
        carnet: student.carnet,
        name: student.name.split(' ')[0]
      }));
    });
    
    // === GESTIÓN DE ERRORES ===
    
    // Manejar errores globales
    const handleError = (error, context = 'Unknown') => {
      console.error(`Error in ${context}:`, error);
      
      scanResult.value = {
        success: false,
        message: `Error en ${context}. Por favor, contacte al administrador.`,
        type: 'error'
      };
      
      setTimeout(() => {
        scanResult.value = null;
      }, 5000);
    };
    
    // === FUNCIONES DE UTILIDAD ===
    
    // Formatear números con separadores de miles
    const formatNumber = (number) => {
      return new Intl.NumberFormat('es-ES').format(number);
    };
    
    // Obtener saludo según la hora del día
    const getGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour < 12) return 'Buenos días';
      if (hour < 18) return 'Buenas tardes';
      return 'Buenas noches';
    };
    
    // === FUNCIONES ESPECÍFICAS FASE 7 ===
    
    // === PASO 7.3: SISTEMA DE NOTIFICACIONES TOAST ===
    
    // Mostrar notificación toast
    const showNotification = (message, type = 'info', duration = 4000) => {
      const notification = {
        id: ++notificationId,
        message,
        type, // 'success', 'error', 'warning', 'info'
        duration,
        timestamp: new Date(),
        isVisible: true
      };
      
      notifications.value.push(notification);
      
      // Auto-remover después del tiempo especificado
      setTimeout(() => {
        removeNotification(notification.id);
      }, duration);
      
      return notification.id;
    };
    
    // Remover notificación específica
    const removeNotification = (id) => {
      const index = notifications.value.findIndex(n => n.id === id);
      if (index > -1) {
        notifications.value[index].isVisible = false;
        // Remover después de la animación
        setTimeout(() => {
          notifications.value.splice(index, 1);
        }, 300);
      }
    };
    
    // Limpiar todas las notificaciones
    const clearAllNotifications = () => {
      notifications.value.forEach(notification => {
        notification.isVisible = false;
      });
      setTimeout(() => {
        notifications.value = [];
      }, 300);
    };
    
    // Notificaciones específicas por tipo
    const showSuccess = (message, duration = 3000) => {
      return showNotification(message, 'success', duration);
    };
    
    const showError = (message, duration = 5000) => {
      return showNotification(message, 'error', duration);
    };
    
    const showWarning = (message, duration = 4000) => {
      return showNotification(message, 'warning', duration);
    };
    
    const showInfo = (message, duration = 4000) => {
      return showNotification(message, 'info', duration);
    };
    
    // === PASO 7.2: SISTEMA DE PERSISTENCIA LOCAL ===
    
    // Guardar datos en localStorage
    const saveToLocalStorage = (key, data) => {
      try {
        if (!persistenceState.value.isEnabled) return false;
        
        const serializedData = JSON.stringify({
          data,
          timestamp: new Date().toISOString(),
          version: '1.0'
        });
        
        localStorage.setItem(key, serializedData);
        persistenceState.value.lastSaved = new Date();
        
        return true;
      } catch (error) {
        console.error('Error guardando en localStorage:', error);
        showError('Error al guardar datos localmente');
        return false;
      }
    };
    
    // Cargar datos desde localStorage
    const loadFromLocalStorage = (key, defaultValue = null) => {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) return defaultValue;
        
        const parsed = JSON.parse(stored);
        return parsed.data || defaultValue;
      } catch (error) {
        console.error('Error cargando desde localStorage:', error);
        return defaultValue;
      }
    };
    
    // Guardar estado completo de la aplicación
    const saveAppState = () => {
      const appState = {
        students: students.value,
        talks: talks.value,
        currentAttendance: currentAttendance.value,
        userSession: {
          currentUserRole: currentUserRole.value,
          currentUser: currentUser.value,
          selectedStudentCarnet: selectedStudentCarnet.value
        }
      };
      
      // Guardar por partes para mejor organización
      saveToLocalStorage(STORAGE_KEYS.STUDENTS, students.value);
      saveToLocalStorage(STORAGE_KEYS.TALKS, talks.value);
      saveToLocalStorage(STORAGE_KEYS.ATTENDANCE, currentAttendance.value);
      saveToLocalStorage(STORAGE_KEYS.USER_SESSION, appState.userSession);
      saveToLocalStorage(STORAGE_KEYS.APP_STATE, {
        lastSaved: new Date().toISOString(),
        version: '1.0'
      });
      
      showSuccess('Estado guardado correctamente', 2000);
    };
    
    // Cargar estado completo de la aplicación
    const loadAppState = () => {
      try {
        const savedStudents = loadFromLocalStorage(STORAGE_KEYS.STUDENTS);
        const savedTalks = loadFromLocalStorage(STORAGE_KEYS.TALKS);
        const savedAttendance = loadFromLocalStorage(STORAGE_KEYS.ATTENDANCE);
        const savedUserSession = loadFromLocalStorage(STORAGE_KEYS.USER_SESSION);
        
        if (savedStudents) {
          students.value = savedStudents;
        }
        
        if (savedTalks) {
          talks.value = savedTalks;
        }
        
        if (savedAttendance) {
          currentAttendance.value = savedAttendance;
        }
        
        if (savedUserSession) {
          currentUserRole.value = savedUserSession.currentUserRole;
          currentUser.value = savedUserSession.currentUser;
          selectedStudentCarnet.value = savedUserSession.selectedStudentCarnet;
        }
        
        const appState = loadFromLocalStorage(STORAGE_KEYS.APP_STATE);
        if (appState) {
          persistenceState.value.lastSaved = new Date(appState.lastSaved);
          showInfo('Estado cargado desde almacenamiento local', 2000);
        }
        
        return true;
      } catch (error) {
        console.error('Error cargando estado:', error);
        showError('Error al cargar estado guardado');
        return false;
      }
    };
    
    // Resetear datos para demostración
    const resetAppData = () => {
      try {
        // Limpiar localStorage
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
        
        // Restaurar datos originales
        students.value = [...window.MOCK_DATA.MOCK_STUDENTS];
        talks.value = [...window.MOCK_DATA.MOCK_TALKS];
        currentAttendance.value = [...window.MOCK_DATA.CURRENT_ATTENDANCE];
        
        // Resetear sesión
        currentUserRole.value = null;
        currentUser.value = null;
        selectedStudentCarnet.value = '';
        
        // Resetear estados
        resetLoginState();
        clearSearch();
        clearAllNotifications();
        
        // Navegar al login
        navigateTo('#login');
        
        showSuccess('Aplicación reseteada correctamente', 3000);
        
        return true;
      } catch (error) {
        console.error('Error reseteando aplicación:', error);
        showError('Error al resetear la aplicación');
        return false;
      }
    };
    
    // Auto-guardar cuando hay cambios importantes
    const autoSave = () => {
      if (persistenceState.value.autoSave && persistenceState.value.isEnabled) {
        saveAppState();
      }
    };
    
    // === PASO 7.1: FLUJO COMPLETO MOCKEADO ===
    
    // Actualizar progreso de estudiante en tiempo real
    const updateStudentProgress = (studentCarnet, talkId, talkValue = 1) => {
      const studentIndex = students.value.findIndex(s => s.carnet === studentCarnet);
      if (studentIndex === -1) return false;
      
      const student = students.value[studentIndex];
      
      // Actualizar contador de charlas completadas
      student.completedTalks += talkValue;
      
      // Actualizar lista de charlas asistidas si no existe
      if (!student.attendedTalks) {
        student.attendedTalks = [];
      }
      
      // Agregar charla a la lista de asistidas
      if (!student.attendedTalks.includes(talkId)) {
        student.attendedTalks.push(talkId);
      }
      
      // Actualizar fecha de última actividad
      student.lastActivity = new Date().toISOString();
      
      // Trigger reactivity
      students.value[studentIndex] = { ...student };
      
      // Auto-guardar cambios
      autoSave();
      
      return true;
    };
    
    // Sincronizar asistencia entre coordinador y estudiante
    const syncAttendanceData = (studentCarnet, talkId) => {
      try {
        // Buscar la charla
        const talk = talks.value.find(t => t.id === talkId);
        if (!talk) {
          showError('Charla no encontrada');
          return false;
        }
        
        // Buscar el estudiante
        const student = students.value.find(s => s.carnet === studentCarnet);
        if (!student) {
          showError('Estudiante no encontrado');
          return false;
        }
        
        // Actualizar contador de asistentes en la charla
        talk.attendees = (talk.attendees || 0) + 1;
        
        // Actualizar progreso del estudiante
        const updated = updateStudentProgress(studentCarnet, talkId, talk.value);
        
        if (updated) {
          // Mostrar notificación de éxito
          showSuccess(`✅ Asistencia registrada: ${student.name} - ${talk.title}`, 4000);
          
          // Si el estudiante actual está viendo su dashboard, actualizar inmediatamente
          if (currentUserRole.value === 'student' && 
              currentUser.value && 
              currentUser.value.carnet === studentCarnet) {
            
            // Actualizar usuario actual con nuevos datos
            currentUser.value = { ...students.value.find(s => s.carnet === studentCarnet) };
            
            // Mostrar notificación específica para el estudiante
            showInfo(`🎉 ¡Nueva charla completada! Progreso actualizado: ${currentUser.value.completedTalks}/${currentUser.value.requiredTalks}`, 5000);
          }
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error sincronizando asistencia:', error);
        showError('Error al sincronizar datos de asistencia');
        return false;
      }
    };
    
    // Crear charla y actualizar listas inmediatamente
    const createTalkWithSync = async (talkData) => {
      try {
        // Generar ID único
        const newId = Math.max(...talks.value.map(t => t.id)) + 1;
        
        // Crear objeto de charla
        const newTalk = {
          id: newId,
          ...talkData,
          attendees: 0,
          status: 'upcoming',
          createdAt: new Date().toISOString()
        };
        
        // Agregar a la lista de charlas
        talks.value.push(newTalk);
        
        // Auto-guardar
        autoSave();
        
        // Notificación de éxito
        showSuccess(`✅ Charla "${newTalk.title}" creada y disponible inmediatamente`, 4000);
        
        // Si hay estudiantes conectados, notificar nueva charla disponible
        if (currentUserRole.value === 'student') {
          showInfo(`🆕 Nueva charla disponible: ${newTalk.title}`, 4000);
        }
        
        return newTalk;
      } catch (error) {
        console.error('Error creando charla:', error);
        showError('Error al crear la charla');
        return null;
      }
    };
    
    // Buscar estudiante con feedback inmediato
    const searchStudentWithFeedback = async (query) => {
      if (!query.trim()) {
        showWarning('Ingresa un término de búsqueda');
        return [];
      }
      
      try {
        // Simular búsqueda
        const results = students.value.filter(student => 
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.carnet.toLowerCase().includes(query.toLowerCase()) ||
          student.career.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
          showSuccess(`✅ ${results.length} estudiante${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''}`, 2000);
        } else {
          showWarning('No se encontraron estudiantes con ese criterio', 3000);
        }
        
        return results;
      } catch (error) {
        console.error('Error en búsqueda:', error);
        showError('Error al buscar estudiantes');
        return [];
      }
    };
    
    // === CICLO DE VIDA ===
    
    onMounted(() => {
      console.log(`✅ ${appName.value} iniciado correctamente`);
      console.log('📊 Datos cargados:', {
        estudiantes: students.value.length,
        charlas: talks.value.length,
        asistenciaActual: currentAttendance.value.length
      });
      
      // Configurar listener para cambios de hash
      window.addEventListener('hashchange', handleRouteChange);
      
      // Manejar ruta inicial
      handleRouteChange();
      
      // Cargar estado guardado si existe (Fase 7)
      loadAppState();
      
      // Mostrar mensaje de bienvenida
      setTimeout(() => {
        showInfo('¡Bienvenido al Sistema PUCMMTUB! 🎓', 3000);
      }, 1000);
      
      // Enfocar automáticamente el input de escaneo si estamos en esa vista
      nextTick(() => {
        if (currentView.value === 'scan') {
          const scanInputElement = document.getElementById('carnet-input');
          if (scanInputElement) {
            scanInputElement.focus();
          }
        }
      });
    });

    // === RETORNO DEL SETUP ===
    return {
      // Estado de routing y navegación
      currentRoute,
      currentView,
      currentUserRole,
      currentUser,
      selectedStudentCarnet,
      
      // Estado de la aplicación
      appName,
      students,
      talks,
      currentAttendance,
      scanInput,
      scanResult,
      isScanning,
      isLoading,
      
      // Vistas disponibles
      coordinatorViews,
      studentViews,
      demoStudents,
      
      // Computadas
      stats,
      activeStudentsCount,
      completedTalks,
      upcomingTalks,
      studentsByStatus,
      exampleCarnets,
      currentUserType,
      currentUserName,
      todayAttendanceCount,
      searchStatus,
      isAnyLoading,
      loadingMessage,
      studentProgressAnimated,
      
      // Estado Fase 4
      studentSearchQuery,
      searchResults,
      showCreateTalkModal,
      newTalk,
      formErrors,
      isCreatingTalk,
      showTalkDetailsModal,
      selectedTalk,
      currentTalkForAttendance,
      currentStudentSection,
      
      // Estado Fase 6
      loginState,
      searchState,
      loadingStates,
      
      // Estado Fase 7
      notifications,
      persistenceState,
      
      // Métodos de navegación y routing
      navigateTo,
      handleRouteChange,
      changeView,
      
      // Métodos de login (Fase 6 mejorados)
      selectRole,
      validateStudentSelection,
      loginAsCoordinator,
      loginAsStudent,
      resetLoginState,
      quickLoginCoordinator,
      quickLoginStudent,
      logout,
      
      // Métodos de datos
      getStatusClass,
      getStatusText,
      formatDate,
      getStudentProgress,
      filterStudents,
      getTalkStats,
      getTalkCategories,
      
      // Métodos Fase 4 (Fase 6 mejorados)
      searchStudents,
      performSearch,
      clearSearch,
      openCreateTalkModal,
      closeCreateTalkModal,
      validateTalkForm,
      createNewTalk,
      viewTalkDetails,
      closeTalkDetailsModal,
      getAttendeesByTalk,
      startTalkAttendance,
      
      // Métodos Fase 5
      setStudentSection,
      getProgressColorClass,
      getAttendedTalksOrdered,
      getUpcomingTalksForStudent,
      hasAttendedTalk,
      getUpcomingTalkStatus,
      getUpcomingTalkIcon,
      
      // Métodos de escaneo
      processCarnet,
      clearAttendance,
      simulateQuickScan,
      
      // Utilidades
      formatNumber,
      getGreeting,
      handleError,
      
      // Métodos Fase 7
      showNotification,
      removeNotification,
      clearAllNotifications,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      saveAppState,
      loadAppState,
      resetAppData,
      updateStudentProgress,
      syncAttendanceData,
      createTalkWithSync,
      searchStudentWithFeedback
    };
  }
});

// === COMPONENTES GLOBALES ===

// Componente para tarjetas de estadísticas
app.component('stat-card', {
  props: ['title', 'value', 'icon', 'color'],
  template: `
    <div class="stat-card" :class="[color && 'stat-card--' + color]">
      <div class="stat-card__icon" v-if="icon">{{ icon }}</div>
      <div class="stat-card__content">
        <h3 class="stat-card__title">{{ title }}</h3>
        <p class="stat-card__value">{{ value }}</p>
      </div>
    </div>
  `
});

// Componente para badges de estado
app.component('status-badge', {
  props: ['student'],
  template: `
    <span :class="['badge', 'status-badge', getStatusClass(student)]">
      {{ getStatusText(student) }}
    </span>
  `,
  methods: {
    getStatusClass: window.MOCK_DATA.getStatusClass,
    getStatusText: window.MOCK_DATA.getStatusText
  }
});

// === ESTILOS ESPECÍFICOS DE LA APLICACIÓN ===

// Inyectar estilos CSS específicos para los componentes de la aplicación
const appStyles = `
/* Estilos específicos para la aplicación PUCMMTUB */
.header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-4) 0;
  box-shadow: var(--shadow-md);
}

.app-title {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.nav {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.nav-button {
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-md);
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-button--active {
  background: var(--color-white);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.main {
  padding: var(--space-8) 0;
  min-height: calc(100vh - 200px);
}

.view {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin: var(--space-6) 0;
}

.stat-card {
  background: var(--color-white);
  padding: var(--space-6);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--transition-fast);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
}

.stat-card__icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-3);
}

.stat-card__title {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-2);
}

.stat-card__value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0;
}

.talks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
  margin: var(--space-6) 0;
}

.talk-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast);
}

.talk-card:hover {
  box-shadow: var(--shadow-md);
}

.talk-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.talk-date, .talk-location {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.talk-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: var(--space-4) 0;
  padding: var(--space-3);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
}

.talk-stat {
  font-size: var(--font-size-sm);
}

.scan-section {
  max-width: 600px;
  margin: 0 auto;
}

.scan-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.scan-input label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.scan-result {
  padding: var(--space-4);
  border-radius: var(--border-radius-md);
  margin: var(--space-4) 0;
  font-weight: var(--font-weight-medium);
}

.scan-result.success {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
  border: 1px solid var(--color-success);
}

.scan-result.warning {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
  border: 1px solid var(--color-warning);
}

.scan-result.error {
  background-color: var(--color-danger-light);
  color: var(--color-danger-dark);
  border: 1px solid var(--color-danger);
}

.current-attendance {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  margin-top: var(--space-6);
}

.current-attendance h3 {
  margin-bottom: var(--space-4);
  color: var(--color-primary);
}

.current-attendance ul {
  list-style: none;
  padding: 0;
}

.current-attendance li {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
}

.current-attendance li:last-child {
  border-bottom: none;
}

.status-badge {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
}

.footer {
  background: var(--color-background-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-4) 0;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .nav {
    flex-wrap: wrap;
  }
  
  .nav-button {
    flex: 1;
    min-width: calc(50% - var(--space-1));
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .talks-grid {
    grid-template-columns: 1fr;
  }
  
  .scan-input {
    gap: var(--space-3);
  }
}
`;

// Inyectar estilos en el documento
const styleSheet = document.createElement('style');
styleSheet.textContent = appStyles;
document.head.appendChild(styleSheet);

// === MONTAR LA APLICACIÓN ===

// Montar la aplicación en el elemento #app
app.mount('#app');

// === FUNCIONES GLOBALES PARA DEBUGGING ===

// Funciones útiles para debugging en la consola del navegador
window.SAMANTA_DEBUG = {
  getAppData: () => ({
    students: window.MOCK_DATA.MOCK_STUDENTS,
    talks: window.MOCK_DATA.MOCK_TALKS,
    attendance: window.MOCK_DATA.CURRENT_ATTENDANCE,
    config: window.MOCK_DATA.SYSTEM_CONFIG
  }),
  
  addTestAttendance: () => {
    const testCarnets = ['2021001', '2020045', '2022078'];
    testCarnets.forEach(carnet => {
      window.MOCK_DATA.registerAttendance(carnet);
    });
    console.log('✅ Asistencia de prueba agregada');
  },
  
  clearAllAttendance: () => {
    window.MOCK_DATA.clearCurrentAttendance();
    console.log('🧹 Asistencia limpiada');
  },
  
  simulateRandomAttendance: (count = 5) => {
    const students = window.MOCK_DATA.MOCK_STUDENTS;
    for (let i = 0; i < count && i < students.length; i++) {
      const randomStudent = students[Math.floor(Math.random() * students.length)];
      window.MOCK_DATA.registerAttendance(randomStudent.carnet);
    }
    console.log(`🎲 ${count} asistencias aleatorias simuladas`);
  }
};

console.log('🚀 Sistema PUCMMTUB iniciado correctamente');
console.log('🔧 Para debugging, usa: window.SAMANTA_DEBUG');
console.log('📱 CDN Vue.js:', Vue.version || 'Versión no detectada'); 