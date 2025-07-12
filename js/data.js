// Base de datos de TTech Cursos
console.log("OK");

const cursos = [
    {
        id: "01",
        imagen: "./assets/img/desarrollo-web.jpg",
        alt: "Desarrollo Web",
        nombre: "Desarrollo Web",
        descripcion: "Aprende HTML, CSS y JavaScript",
        duracion: "12 semanas",
        nivel: "Nivel inicial",
        precioAnterior: 159999,
        precioActual: 99999,
        categoria: "programacion",
        activo: true,
        detalles: "Domina las tecnologías fundamentales del desarrollo web frontend y backend"
    },
    {
        id: "02",
        imagen: "./assets/img/python.jpg",
        alt: "Python",
        nombre: "Aprende Python",
        descripcion: "Aprende las bases de Python",
        duracion: "8 semanas",
        nivel: "Nivel inicial",
        precioAnterior: 75999,
        precioActual: 59999,
        categoria: "programacion",
        activo: true,
        detalles: "Desde variables hasta frameworks, conviértete en un desarrollador Python"
    },
    {
        id: "03",
        imagen: "./assets/img/ux-ui.jpg",
        alt: "UX UI Design",
        nombre: "UX/UI Design",
        descripcion: "Diseña experiencias digitales increíbles",
        duracion: "14 semanas",
        nivel: "Nivel inicial",
        precioAnterior: null,
        precioActual: 73999,
        categoria: "diseno",
        activo: true,
        detalles: "Crea interfaces intuitivas y experiencias de usuario memorables"
    },
    {
        id: "04",
        imagen: "./assets/img/data-science.jpg",
        alt: "Data Science",
        nombre: "Data Science",
        descripcion: "Análisis de datos con Python y R",
        duracion: "16 semanas",
        nivel: "Nivel intermedio",
        precioAnterior: 222999,
        precioActual: 116999,
        categoria: "datos",
        activo: true,
        detalles: "Convierte datos en insights valiosos usando machine learning"
    },
    {
        id: "05",
        imagen: "./assets/img/react.jpg",
        alt: "React Avanzado",
        nombre: "React Avanzado",
        descripcion: "Desarrollo de aplicaciones con React",
        duracion: "10 semanas",
        nivel: "Nivel avanzado",
        precioAnterior: null,
        precioActual: 25999,
        categoria: "programacion",
        activo: true,
        detalles: "Domina React, Redux, Next.js y las mejores prácticas modernas"
    },
    {
        id: "06",
        imagen: "./assets/img/ux-ui.jpg",
        alt: "Desarrollo Mobile",
        nombre: "Desarrollo Mobile",
        descripcion: "Apps para Android e iOS",
        duracion: "12 semanas",
        nivel: "Nivel intermedio",
        precioAnterior: null,
        precioActual: 20999,
        categoria: "programacion",
        activo: true,
        detalles: "Crea aplicaciones nativas y multiplataforma con React Native"
    }
];

const testimonios = [
    {
        id: "t01",
        usuario: "Juan García",
        imagen: "./assets/img/usuario1.jpg",
        alt: "Usuario",
        calificacion: 1,
        comentario: "Me equivoque de curso",
        curso: "Desarrollo Web",
        fecha: "2025-12-15"
    },
    {
        id: "t02",
        usuario: "María López",
        imagen: "./assets/img/usuario2.webp",
        alt: "Usuario",
        calificacion: 4.5,
        comentario: "La metodología de enseñanza es clara y las prácticas son muy útiles",
        curso: "UX/UI Design",
        fecha: "2025-11-28"
    },
    {
        id: "t03",
        usuario: "Carlos Ruiz",
        imagen: "./assets/img/usuario1.jpg",
        alt: "Usuario",
        calificacion: 5,
        comentario: "Python se volvió mi lenguaje favorito gracias a este curso",
        curso: "Aprende Python",
        fecha: "2024-12-02"
    }
];

const contactoInfo = {
    telefono: "+54 11 4444-4444",
    email: "info@ttechcursos.com",
    direccion: "Calle falsa 1234",
    redesSociales: [
        { nombre: "Facebook", url: "https://facebook.com/", icono: "fab fa-facebook-f" },
        { nombre: "Twitter", url: "https://twitter.com/", icono: "fab fa-twitter" },
        { nombre: "Instagram", url: "https://instagram.com/", icono: "fab fa-instagram" },
        { nombre: "LinkedIn", url: "https://linkedin.com/", icono: "fab fa-linkedin-in" }
    ]
};
