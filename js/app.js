
//  PRIMERO SE ENLAZAN LAS CLASES (MOLDES)
class Evaluadores {
    constructor(revisor) {
        // Atributos de la revisión por pares
        this.revisor = revisor;
        this.revisado = null;
        this.repositorio = null; // Aquí se almacenará el enlace de GitHub real del revisado
    }
}

// los strings de "github" introduciendo las URLs reales de tus compañeros
const integrantes = [
    { nombre: "Aya", github: "https://github.com/ayaelo9" }, 
    { nombre: "Cristian", github: "https://github.com/xiles5" }, 
    { nombre: "Cyrille", github: "https://github.com/cyrille514" }, 
    { nombre: "David", github: "https://github.com/dayvip369" }, 
    { nombre: "Guillermo", github: "https://github.com/codeguille98" }, 
    { nombre: "Jenifer", github: "https://github.com/jenifer-al" }, 
    { nombre: "Joelle", github: "https://github.com/moussijoelle" }, 
    { nombre: "Maximiliam", github: "https://github.com/mx-2-d" }, 
    { nombre: "Mohammed", github: "https://github.com/MohammedZakhbat" }, 
    { nombre: "Naomi", github: "https://github.com/naomiquitosalazar-cyber" }, 
    { nombre: "Natalia", github: "https://github.com/nataliya-stack" }, 
    { nombre: "Yolanda", github: "https://github.com/fontanillus" }, 
    { nombre: "Yordano", github: "https://github.com/yordano108" }
];

// Array global dinámico que guardará los objetos de la clase Evaluadores
let revisiones = [];

// Objeto global vacío para resguardar las referencias con nombre de las funciones flecha
const accionesAsignacion = {};

//  FUNCIÓN FLECHA: Genera un índice aleatorio circular entero
const obtenerIndiceAleatorio = (max) => Math.floor(Math.random() * max);

//  FUNCIÓN FLECHA: Renderiza las tarjetas aplicando la responsividad de Tailwind CSS
const mostrarResultados = () => {
    const gridRevisiones = document.getElementById("grid-revisiones");
    if (!gridRevisiones) return;

    gridRevisiones.innerHTML = ""; // Limpiar el mensaje previo por defecto

    revisiones.forEach(item => {
        // Fabricamos el nodo HTML de la tarjeta en tiempo real
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between text-left animate-fade-in";

        tarjeta.innerHTML = `
            <div>
                <div class="mb-3 text-xs font-bold uppercase tracking-wider text-blue-500">Asignación</div>
                <div class="mb-2">
                    <span class="block text-xs font-semibold text-gray-400">REVISOR:</span>
                    <span class="text-base font-bold text-gray-800">${item.revisor}</span>
                </div>
                <div class="mb-4">
                    <span class="block text-xs font-semibold text-gray-400">DEBE REVISAR A:</span>
                    <span class="text-base font-bold text-indigo-700">${item.revisado}</span>
                </div>
            </div>
            <div class="border-t border-gray-100 pt-3 mt-2">
                <span class="block text-xs font-semibold text-gray-400 mb-1">REPOSITORIO DEL PROYECTO:</span>
                <a href="${item.repositorio}" target="_blank" class="text-xs text-blue-600 hover:underline break-all block font-mono font-medium">${item.repositorio}</a>
            </div>
        `;
        gridRevisiones.appendChild(tarjeta);
    });
};

// C. FUNCIÓN FLECHA CON NOMBRE: Procesa el emparejamiento aleatorio cruzando los objetos
accionesAsignacion.generarAsignaciones = () => {
    // Inicializamos el array mapeando los nombres desde los objetos del Bloque 2 a la Clase del Bloque 1
    revisiones = integrantes.map(persona => new Evaluadores(persona.nombre));

    // Array auxiliar para controlar que nadie sea revisado dos veces
    let yaAsignados = [];

    // Bucle para rellenar los atributos de cada objeto instanciado
    for (let i = 0; i < revisiones.length; i++) {
        let objetoActual = revisiones[i];
        let intentoCorrecto = false;
        let intentos = 0;

        // Algoritmo de control de restricciones por descarte
        while (!intentoCorrecto) {
            let indiceAleatorio = obtenerIndiceAleatorio(integrantes.length);
            let candidato = integrantes[indiceAleatorio];

            // Restricciones: No auto-revisarse Y que el compañero no tenga ya un revisor asignado
            const esDiferente = candidato.nombre !== objetoActual.revisor;
            const noEstaAsignado = !yaAsignados.includes(candidato.nombre);

            // Resguardo de seguridad: Si el último se bloquea por falta de combinaciones, reinicia el bucle total
            if (intentos > 100) {
                return accionesAsignacion.generarAsignaciones(); 
            }

            if (esDiferente && noEstaAsignado) {
                objetoActual.revisado = candidato.nombre;
                
                // ASIGNACIÓN DIRECTA RESPONSIVA: Extrae la URL real de GitHub guardada arriba en el array de objetos
                objetoActual.repositorio = candidato.github;
                
                yaAsignados.push(candidato.nombre);
                intentoCorrecto = true;
            }
            intentos++;
        }
    }

    // Volcar los objetos procesados a la pantalla
    mostrarResultados();
};


//  DISPARADOR GLOBAL (ESCUCHADOR NATIVO DE ARRANQUE)
// Espera a que el navegador dibuje el HTML para mapear los textos iniciales de forma segura
document.addEventListener("DOMContentLoaded", () => {
    const btnAsignar = document.getElementById("btn-asignar");
    const txtIntegrantes = document.getElementById("lista-integrantes");

    // Renderizar la lista inicial de integrantes en texto plano extrayendo la propiedad .nombre
    if (txtIntegrantes) {
        txtIntegrantes.textContent = integrantes.map(i => i.nombre).join(", ");
    }

    // ASIGNACIÓN DE ESCUCHADOR NATIVO INDEPENDIENTE: Conecta el botón al método del objeto
    if (btnAsignar) {
        btnAsignar.addEventListener("click", accionesAsignacion.generarAsignaciones);
    }
});
