
// variables
let carrito = [];


// FUNCIONES

// Agrega un curso al carrito o incrementa su cantidad si ya existe.
function agregarCursoAlCarrito(idCurso) {
    // Buscar si el curso ya está en el carrito
    let cursoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idCurso) {
            cursoEnCarrito = carrito[i];
            break;
        }
    }

    if (cursoEnCarrito) {
        // Si el curso ya está, incrementar la cantidad
        cursoEnCarrito.cantidad++;
    } else {
        // Si no está, buscar el curso en el array 'cursos' original
        let cursoOriginal = null;
        for (let i = 0; i < cursos.length; i++) {
            if (cursos[i].id === idCurso) {
                cursoOriginal = cursos[i];
                break;
            }
        }

        if (cursoOriginal) {
            // Añadir el curso al carrito con cantidad 1
            carrito.push({ ...cursoOriginal, cantidad: 1 });
        }
    }
    actualizarContadorCarrito();

    // toast de confirmación
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: '¡Curso agregado al carrito!'
    });
}

// Genera el contenido HTML del carrito
function generarContenidoCarrito() {
    if (carrito.length === 0) {
        return '<p class="carrito-vacio">El carrito está vacío</p>';
    }

    let contenidoCarrito = '';
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const subtotal = item.precioActual * item.cantidad;
        total += subtotal;

        contenidoCarrito += `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <span class="carrito-item-nombre">${item.nombre}</span>
                    <span class="carrito-item-precio">$${item.precioActual.toLocaleString()} x ${item.cantidad}</span>
                </div>
                <div class="carrito-controles">
                    <button onclick="restarCantidadProducto('${item.id}')" class="btn-cantidad restar">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="carrito-cantidad">${item.cantidad}</span>
                    <button onclick="sumarCantidadProducto('${item.id}')" class="btn-cantidad ">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button onclick="eliminarProductoDelCarrito('${item.id}')" class="btn-eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="carrito-subtotal">
                    $${subtotal.toLocaleString()}
                </div>
            </div>
        `;
    }

    contenidoCarrito += `
        <div class="carrito-total">
            <h3>Total: $${total.toLocaleString()}</h3>
        </div>
    `;

    return contenidoCarrito;
}

// Actualiza el carrito sin cerrar el modal
function actualizarCarritoModal() {
    const nuevoContenido = generarContenidoCarrito();

    // Si el carrito está vacío, cerrar el modal
    if (carrito.length === 0) {
        Swal.close();
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Se han eliminado todos los cursos del carrito',
            timer: 1500,
            showConfirmButton: false
        });
        return;
    }

    // Actualizar el contenido del modal sin cerrarlo
    Swal.update({
        html: nuevoContenido
    });
}

// Suma una unidad a la cantidad de un producto en el carrito.
function sumarCantidadProducto(idCurso) {
    let cursoEnCarrito = null;

    // Buscar el curso en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idCurso) {
            cursoEnCarrito = carrito[i];
            break;
        }
    }

    if (cursoEnCarrito) {
        cursoEnCarrito.cantidad++;
        actualizarContadorCarrito();
        actualizarCarritoModal();
    }
}

// Resta una unidad a la cantidad de un producto en el carrito.
function restarCantidadProducto(idCurso) {
    let cursoEnCarrito = null;
    // Buscar el curso en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idCurso) {
            cursoEnCarrito = carrito[i];
            break;
        }
    }

    if (cursoEnCarrito) {
        cursoEnCarrito.cantidad--;
        if (cursoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idCurso); // Eliminar si la cantidad llega a 0
        } else {
            actualizarContadorCarrito();
            actualizarCarritoModal();
        }
    }
}

// Elimina completamente un producto del carrito.
function eliminarProductoDelCarrito(idCurso) {
    // Reconstruir el array carrito sin el producto a eliminar
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        // Buscar los elementos distintos al que hay que eliminar
        if (carrito[i].id !== idCurso) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarContadorCarrito();
    actualizarCarritoModal();
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');
    let totalCursos = 0;

    for (let i = 0; i < carrito.length; i++) {
        totalCursos += carrito[i].cantidad;
    }

    contador.textContent = totalCursos;
}

// Mostrar contenido del carrito con modal de SweetAlert2
function mostrarCarrito() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'No tienes cursos en tu carrito',
        });
        return;
    }

    const contenidoCarrito = generarContenidoCarrito();

    Swal.fire({
        title: 'Tu Carrito de Compras',
        html: contenidoCarrito,
        showCancelButton: true,
        confirmButtonText: 'Proceder al Pago',
        cancelButtonText: 'Seguir Comprando',
        showDenyButton: true,
        denyButtonText: 'Vaciar Carrito',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        denyButtonColor: '#dc3545',
        width: '600px',
        customClass: {
            htmlContainer: 'carrito-container'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            procesarPago();
        } else if (result.isDenied) {
            vaciarCarrito();
        }
    });
}

// Procesar pago (sweetalert)
function procesarPago() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No tienes cursos en tu carrito para procesar el pago',
        });
        return;
    }

    // Calcular total para mostrar en confirmación
    let total = 0;
    let cantidadCursos = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precioActual * carrito[i].cantidad;
        cantidadCursos += carrito[i].cantidad;
    }

    Swal.fire({
        icon: 'success',
        title: '¡Compra exitosa!',
        html: `
            <p>Gracias por tu compra.</p>
            <p><strong>Cursos adquiridos: ${cantidadCursos}</strong></p>
            <p><strong>Total pagado: $${total.toLocaleString()}</strong></p>
            <p>Recibirás un correo con los detalles de acceso a tus cursos.</p>
        `,
        confirmButtonText: 'Continuar',
        timer: 7000,
        timerProgressBar: true,
        showConfirmButton: true,

    }).then(() => {
        carrito = [];
        actualizarContadorCarrito();
    });
}

// Vaciar carrito (sweetalert)
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminarán todos los cursos del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarContadorCarrito();
            Swal.fire({
                icon: 'success',
                title: '¡Carrito vaciado!',
                text: 'Se han eliminado todos los cursos.',
                timer: 1500,
                showConfirmButton: false
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Si cancela, volver a mostrar el carrito
            mostrarCarrito();
        }
    });
}

// Maneja el evento en los botones de Comprar
function manejarComprar(evento) {
    if (evento.target.classList.contains("btn-inscripcion")) {
        const cursoId = evento.target.dataset.id;
        agregarCursoAlCarrito(cursoId);
    }
}

// Agrega el array de cursos al DOM y configura los listeners de "Comprar".
function agregarCursos() {
    const divCursos = document.getElementById("products-container");

    for (let i = 0; i < cursos.length; i++) {
        const curso = cursos[i];

        // Solo mostrar cursos activos
        if (curso.activo) {
            // Determinar si el curso tiene descuento
            const tieneDescuento = curso.precioAnterior &&
                curso.precioAnterior > curso.precioActual;

            // Se crear el HTML del precio según si tiene descuento o no
            let precioHTML = '';
            if (tieneDescuento) {
                precioHTML = `
                    <span class="precio-anterior">$${curso.precioAnterior.toLocaleString()}</span>
                    <span class="precio-actual">$${curso.precioActual.toLocaleString()}</span>
                `;
            } else {
                precioHTML = `
                    <span class="precio-actual">$${curso.precioActual.toLocaleString()}</span>
                `;
            }

            divCursos.insertAdjacentHTML("afterbegin",
                `
                <div class="curso">
                    <img src="${curso.imagen}" alt="${curso.alt}">
                    <div class="curso-contenido">
                        <h3>${curso.nombre}</h3>
                        <p>${curso.descripcion}</p>
                        <div class="info-curso">
                            <span><i class="fas fa-clock"></i> ${curso.duracion}</span>
                            <span><i class="fas fa-signal"></i> ${curso.nivel}</span>
                        </div>
                        <div class="precio-curso">
                            ${precioHTML}
                        </div>
                        <p class="curso-detalles">${curso.detalles}</p>
                        <button class="btn-inscripcion" type="button" data-id="${curso.id}">Comprar</button>
                    </div>
                </div>
                `
            );
        }
    }

    // Delegación de eventos para los botones "Comprar"
    divCursos.addEventListener("click", manejarComprar);
}

// Agrega los testimonios del array 'testimonios' al DOM.
function agregarTestimonios() {
    const divTestimonios = document.querySelector(".resenas-container");

    for (let i = 0; i < testimonios.length; i++) {
        const testimonio = testimonios[i];

        // Crear estrellas para la calificación
        let estrellas = '';
        for (let j = 1; j <= 5; j++) {
            if (j <= testimonio.calificacion) {
                estrellas += '<i class="fas fa-star"></i>';
            } else if (j - 0.5 <= testimonio.calificacion) {
                estrellas += '<i class="fas fa-star-half-alt"></i>';
            } else {
                estrellas += '<i class="far fa-star"></i>';
            }
        }

        divTestimonios.insertAdjacentHTML("afterbegin",
            `
            <div class="resena">
                <img src="${testimonio.imagen}" alt="${testimonio.alt}" class="usuario-img">
                <div class="resena-content">
                    <div class="usuario-info">
                        <h4>${testimonio.usuario}</h4>
                        <div class="rating">
                            ${estrellas} (${testimonio.calificacion})
                        </div>
                    </div>
                    <p>"${testimonio.comentario}"</p>
                    <div class="testimonio-info">
                        <strong>Curso:</strong> ${testimonio.curso} | 
                        <strong>Fecha:</strong> ${new Date(testimonio.fecha).toLocaleDateString('es-ES')}
                    </div>
                </div>
            </div>
            `
        );
    }
}

// Agrega la información de contacto al DOM.
function agregarContacto() {
    const divContacto = document.querySelector(".contact-container");

    divContacto.innerHTML = `
        <p><i class="fas fa-phone"></i> ${contactoInfo.telefono}</p>
        <p><i class="fas fa-envelope"></i> ${contactoInfo.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${contactoInfo.direccion}</p>
    `;
}

// Agregar iconos de contacto al DOM.
function agregarIconos() {
    const divIconos = document.querySelector(".sitio-footer");

    // crear un elemento div para la información de contacto
    const info = document.createElement("div");
    info.classList.add("social-icons")
    info.innerHTML = `
            <a href="${contactoInfo.redesSociales[0].url}" target="_blank"><i class="${contactoInfo.redesSociales[0].icono}"></i></a>
            <a href="${contactoInfo.redesSociales[1].url}" target="_blank"><i class="${contactoInfo.redesSociales[1].icono}"></i></a>
            <a href="${contactoInfo.redesSociales[2].url}" target="_blank"><i class="${contactoInfo.redesSociales[2].icono}"></i></a>
            <a href="${contactoInfo.redesSociales[3].url}" target="_blank"><i class="${contactoInfo.redesSociales[3].icono}"></i></a>
    `;

    // Agregar el texto de copyright
    const copyright = document.createElement("p");
    copyright.textContent = "Copyright 2025 - Todos los derechos reservados.";

    // Agregar la información de contacto al div del footer
    divIconos.appendChild(info);
    divIconos.appendChild(copyright);
}

// Configura el evento del carrito
function configurarCarrito() {
    const cart = document.getElementById('cart-toggle');
    if (cart) {
        cart.addEventListener('click', mostrarCarrito);
    }
}

// Inicializar todas las funciones
agregarCursos();
agregarTestimonios();
agregarContacto();
agregarIconos();
configurarCarrito();
actualizarContadorCarrito();