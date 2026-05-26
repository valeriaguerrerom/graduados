# Red de Egresados - Universidad Mariana

## 🎓 Sistema de Autenticación Implementado

### Credenciales de Prueba
- **Cédula:** 1234567890
- **Contraseña:** password123

### Características Implementadas

#### 1. **Sistema de Login**
- Página de inicio de sesión con cédula y contraseña
- Validación de credenciales
- Diseño institucional con colores de la Universidad Mariana

#### 2. **Rutas Protegidas**
Las siguientes secciones requieren autenticación:
- ✅ Eventos y Networking
- ✅ Recursos y Herramientas
- ✅ Ofertas Laborales
- ✅ Encuestas

#### 3. **Perfil del Graduado**
- Formulario de actualización de datos personales
- Información de contacto
- Datos académicos
- Información laboral (opcional)
- Los usuarios deben completar su perfil para acceder a todos los recursos

#### 4. **Diseño Institucional**
- Colores oficiales de la Universidad Mariana:
  - Azul Marino (#003B7A) - Color primario
  - Dorado (#FDB913) - Color secundario
  - Verde (#82bb08) - Color de acento
- Tipografía Montserrat
- Logo y elementos visuales institucionales
- Barra superior con información de contacto
- Footer mejorado con redes sociales

#### 5. **Navegación Inteligente**
- El navbar muestra diferentes opciones según el estado de autenticación
- Menú de usuario con opción de cerrar sesión
- Indicadores visuales de secciones protegidas

### Flujo de Usuario

1. **Usuario No Autenticado:**
   - Ve la página de inicio con información general
   - Puede hacer clic en "Iniciar Sesión"
   - Al intentar acceder a secciones protegidas, es redirigido al login

2. **Después del Login:**
   - Es redirigido a completar su perfil
   - Debe actualizar sus datos personales, académicos y de contacto
   - Puede completar el perfil más tarde

3. **Usuario Autenticado con Perfil Completo:**
   - Acceso completo a todas las secciones
   - Ve ofertas laborales exclusivas
   - Puede participar en eventos
   - Accede a recursos y herramientas

### Tecnologías Utilizadas
- React + TypeScript
- React Router para navegación
- Context API para gestión de estado de autenticación
- Tailwind CSS para estilos
- Lucide React para iconos

### Próximos Pasos Sugeridos
- Integrar con backend real para autenticación
- Implementar recuperación de contraseña
- Agregar registro de nuevos usuarios
- Conectar con base de datos para almacenar perfiles
- Implementar sistema de notificaciones
- Agregar chat o mensajería entre egresados
