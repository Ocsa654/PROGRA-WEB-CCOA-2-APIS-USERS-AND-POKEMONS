# LOGIN AND API OACC POKEMONS AND USERS

Este proyecto es una demostración básica de cómo implementar un sistema de inicio de sesión en Angular que interactúa con una API para validar usuarios. Una vez autenticado, el usuario puede acceder a un Dashboard donde se muestra una lista paginada de usuarios obtenida desde la API. Además, el Dashboard incluye otras funcionalidades como Privacidad, Preferencias de anuncios, etc.

# Características

Formulario de inicio de sesión: Permite a los usuarios ingresar sus credenciales (usuario y contraseña).

Validación con API: Verifica las credenciales enviadas al servidor para autenticar al usuario.

Dashboard interactivo: Muestra una lista de usuarios, preferencias de anuncios y opciones de privacidad.

Tabla de usuarios con paginación: Muestra una tabla paginada con información de usuarios obtenida desde la API.

Manejo de errores: Muestra mensajes de error si el inicio de sesión falla, ya sea por credenciales incorrectas o problemas de conexión con la API.

# Tecnologías utilizadas

Angular: Framework para la construcción del frontend.
RxJS: Usado para el manejo de observables y peticiones asíncronas a la API.
CSS: Para los estilos básicos de la aplicación.
Angular Material: Para el diseño de la tabla, la funcionalidad de paginación y otros componentes interactivos.
API Mock: Simulación de una API que devuelve información de usuarios para pruebas.


# Cómo funciona
Inicio de sesión
El usuario ingresa su nombre y contraseña en un formulario.
El componente valida las credenciales llamando al servicio que interactúa con la API.
Si las credenciales son correctas, el usuario es redirigido al Dashboard.
Si las credenciales son incorrectas, se muestra un mensaje de error.

# Dashboard
El Dashboard tiene varias secciones, entre ellas:
Lista de usuarios: Muestra una tabla paginada con información de los usuarios.

Preferencias de privacidad: Permite al usuario gestionar su privacidad en la plataforma.

Preferencias de anuncios (Ads): Permite gestionar las preferencias para los anuncios que se muestran.

Estadísticas de cuenta: Muestra estadísticas básicas relacionadas con la cuenta del usuario.

Preferencias de privacidad:
En esta sección, el usuario puede gestionar configuraciones relacionadas con la privacidad de su cuenta. Por ejemplo, habilitar o deshabilitar la visibilidad de su perfil.

Preferencias de anuncios:
En esta sección, el usuario puede configurar sus preferencias sobre qué tipos de anuncios desea recibir, lo cual puede incluir opciones como "Anuncios personalizados" o "Anuncios genéricos".

# Estructura del proyecto
app/login: Contiene el componente de inicio de sesión, incluyendo la lógica del formulario.

app/services/user.service.ts: Servicio encargado de interactuar con la API para obtener los datos de los usuarios.

app/models/user.model.ts: Modelo de usuario que define la estructura de los datos manejados en la aplicación.

app/dashboard: Componente que muestra varias secciones del Dashboard, como la lista de usuarios, privacidad y preferencias de anuncios.

    1. Lista de Usuarios
    El Dashboard muestra una tabla con los usuarios obtenidos de la API. La tabla incluye la paginación, lo que facilita la navegación  entre una gran cantidad de datos.

    2. Preferencias de Privacidad
    En esta sección, los usuarios pueden gestionar su privacidad en la plataforma, como ocultar o mostrar su perfil a otros usuarios.   Puedes crear un formulario o un conjunto de opciones donde el usuario pueda ajustar estas preferencias.

    3. Preferencias de Anuncios (Ads)
    Los usuarios pueden decidir qué tipo de anuncios prefieren recibir en la plataforma.


# VERIFICACION DEL LOGIN
1. LoginComponent:
El componente LoginComponent contiene un formulario con dos campos: username (nombre de usuario) y password (contraseña).
Al hacer submit (enviar el formulario), se ejecuta la función onSubmit(), que se encarga de llamar al servicio UserService para obtener la lista de usuarios.

En el LoginComponent, cuando se recibe la lista de usuarios, se usa el método .find() de JavaScript para buscar si existe un usuario que coincida con el nombre de usuario y la contraseña ingresados.

Si se encuentra un usuario con el nombre y contraseña correctos, se redirige al dashboard utilizando this.router.navigate(['/dashboard']).

Si no se encuentra ningún usuario que coincida, se muestra una alerta usando window.alert('Usuario o contraseña incorrectos').

```
 this.userService.getUsers().subscribe
    (users: User[]) => {
      const user = users.find(
        u => u.name === this.username && u.password === this.password
      );

      if (user) {
        // Usuario y contraseña correctos
        this.router.navigate(['/dashboard']);
      } else {
        // Usuario o contraseña incorrectos: mostrar alerta
        window.alert('Usuario o contraseña incorrectos');
      }
 ```


2. modelo_user.ts
Tipo de datos: Garantiza que los datos de usuario que recibimos de la API tengan la estructura correcta (tipado).
Consistencia: Al usar el modelo en el servicio y componente, aseguras que todos los usuarios manejados en la aplicación tengan las propiedades adecuadas.


 ```
export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
  }
 ```

3. UserService:
En el UserService, la función getUsers() realiza una solicitud HTTP a la API de usuarios (en este caso, a https://api.escuelajs.co/api/v1/users).
Esta función retorna un Observable de tipo User[], es decir, una lista de todos los usuarios disponibles en la API.


```
//Reuerda incluir los imports

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
```

En resumen, cuando el usuario ingresa sus credenciales y las envía, el LoginComponent se encarga de consultar al UserService, que obtiene los usuarios desde la API. Luego, el LoginComponent verifica si las credenciales coinciden con algún usuario de la lista y actúa en consecuencia: redirige al dashboard si son correctas, o muestra una alerta si no lo son.

# PRUEBAS DE ESCRITORIO
Primero entramos y escribimos las credenciales incorrectas , y se muestra la alerta. Luego, escribimos las credenciales correctas
si quieres probar con alguno puedes probar con el usuario: "Jhon" y contraseña "123456" o cualquier otro usuario que se muestre en la imagen.

![USUARIOS API](src/assets/images/LISTA%20DE%20USUARIOS%20API.png)

![LOGIN INCORRECTO](src/assets/images/LOGIN%20INCORRECTO1.png)

![ALERTA](src/assets/images/LOGIN%20INCORRECTO2.png)

![LOGIN CORRECTO](src/assets/images/LOGIN%20CORRECTO.png)

Ahora podemos entrar en el Dashboard y verificar que se muestren los usuarios correctos con su paginación, para que no estén amontonados y feos los datos.

![TABLA DE USUARIOS](src/assets/images/TABLA%20DE%20USUARIOS.png)

![TABLA DE USUARIOS2](src/assets/images/TABLA%20DE%20USUARIOS2.png)










