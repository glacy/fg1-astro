import { BookOpen, Calculator, FileText, Link } from 'lucide-react';

export interface LinkItem {
    text: string;
    url: string;
    icon: any;
}

export interface WeekData {
    id: number;
    title: string;
    image: string;
    objetivos: string[];
    contenidos: string[];
    consignas: LinkItem[];
    evaluaciones: LinkItem[];
    recursos?: LinkItem[];
}

export const weeksData: Record<number, WeekData> = {
    1: {
        id: 1, title: "Unidades y cantidades físicas",
        image: "https://images.unsplash.com/photo-1559819614-8e87b90b8e9b?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Presentar el programa del curso.",
            "Expresar cantidades físicas usando distintos sistemas de unidades.",
            "Determinar las diferencias entre cantidades físicas escalares y vectoriales.",
            "Realizar suma y resta de vectores."
        ],
        contenidos: [
            "Estándares y Unidades (Seccion 1.3).",
            "Uso y conversión de unidades (Sección 1.4).",
            "Vectores y suma de vectores (Sección 1.7)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 1 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_01.pdf", icon: BookOpen },
            { text: "Estudiar el resumen Semana 1.", url: "/lecturas/lectura_semana1.pdf", icon: FileText }

        ],
        evaluaciones: [
            // { text: "Actividad formativa 1", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=49568", icon: FileText },
            { text: "Práctica 1", url: "/practicas/practica_semana1.pdf", icon: Calculator }
        ]
    },
    2: {
        id: 2, title: "Vectores y operaciones vectoriales",
        image: "https://images.unsplash.com/photo-1516503424803-708327384b90?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Calcular las componentes cartesianas de un vector, dadas su magnitud y dirección.",
            "Calcular la magnitud y dirección de un vector, dadas sus componentes cartesianas.",
            "Realizar distintas operaciones vectoriales: suma y resta de vectores, multiplicación de un vector por un escalar, producto escalar."
        ],
        contenidos: [
            "Componentes de vectores (Sección 1.8).",
            "Vectores unitarios (Sección 1.9).",
            "Productos de vectores (Sección 1.10)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 1 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_01.pdf", icon: BookOpen },
            { text: "Estudiar el resumen Semana 2.", url: "/lecturas/lectura_semana2.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 2", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=49632", icon: FileText },
            { text: "Práctica 2", url: "/practicas/practica_semana2.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 1", url: "/soluciones/solucion_practica_semana1.pdf", icon: Calculator },
            { text: "PhET: Vectores", url: "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_all.html?locale=es", icon: Link }
        ]
    },
    3: {
        id: 3, title: "Cantidades cinemáticas",
        image: "https://images.unsplash.com/photo-1767177375224-c46fc0b50dcf?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir las cantidades físicas de interés como la posición, velocidad, aceleración, rapidez, entre otros.",
            "Diferenciar entre rapidez y velocidad; así como entre cantidades instantáneas y medias.",
            "Analizar las gráficas de un movimiento.",
            "Resolver problemas que involucren los conceptos de cinemática en 1D, tanto analítica como gráficamente."
        ],
        contenidos: [
            "Desplazamiento, tiempo y velocidad media (sección 2.1).",
            "Velocidad instantánea (sección 2.2).",
            "Aceleración media y aceleración instantánea (sección 2.3)"
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 2 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_02.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 3.", url: "/lecturas/lectura_semana3.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 3", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=49750", icon: FileText },
            { text: "Práctica 3", url: "/practicas/practica_semana3.pdf", icon: Calculator },
        ],
        recursos: [
            { text: "Solución Práctica Semana 2", url: "/soluciones/solucion_practica_semana2.pdf", icon: Calculator }
        ]
    },
    4: {
        id: 4, title: "Movimiento rectilíneo",
        image: "https://images.unsplash.com/photo-1452573992436-6d508f200b30?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir las características de un movimiento rectilíneo uniforme (MRU).",
            "Definir las características de un movimiento rectilíneo uniformemente acelerado (MRUA), con la caída libre como un caso particular.",
            "Resolver, analítica y gráficamente, problemas que involucren tanto MRU como MRUA y caída libre."
        ],
        contenidos: [
            "Movimiento con aceleración constante (sección 2.4).",
            "Cuerpos en caída libre (sección 2.5)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 2 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_02.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 4.", url: "/lecturas/lectura_semana4.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 4", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=49895", icon: FileText },
            { text: "Práctica 4", url: "/practicas/practica_semana4.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 3", url: "/soluciones/solucion_practica_semana3.pdf", icon: Calculator }
        ]
    },
    5: {
        id: 5, title: "Movimiento parabólico",
        image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Describir un movimiento general en 2 ó 3 dimensiones, mediante cantidades cinemáticas vectoriales.",
            "Definir las características del movimiento parabólico.",
            "Resolver, analítica y gráficamente, problemas que involucren movimiento parabólico."
        ],
        contenidos: [
            "Vectores de posición y velocidad (sección 3.1).",
            "El vector aceleración (sección 3.2).",
            "Movimiento de proyectiles (sección 3.3)"
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 3 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_03.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 5.", url: "/lecturas/lectura_semana5.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 5", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=50050", icon: FileText },
            { text: "Práctica 5", url: "/practicas/practica_semana5.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 4", url: "/soluciones/solucion_practica_semana4.pdf", icon: Calculator },
            { text: "Phet: Proyectiles", url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html?locale=es", icon: Link }
        ]
    },
    6: {
        id: 6, title: "Leyes del movimiento de Newton",
        image: "https://images.unsplash.com/photo-1633493702341-4d04841df53b?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir el significado de fuerza, fuerza neta sobre un objeto y marco de referencia inercial.",
            "Describir vectorialmente las fuerzas que actúan sobre un objeto.",
            "Explicar las tres leyes de Newton y su relación con el análisis del movimiento de los cuerpos en diferentes contextos físicos.",
            "Determinar la aceleración de un objeto a partir de la fuerza neta que actúa sobre éste y su masa."
        ],
        contenidos: [
            "Fuerza e interacciones (sección 4.1).",
            "Primera ley de Newton (sección 4.2).",
            "Segunda ley de Newton (sección 4.3).",
            "Masa y peso (sección 4.4).",
            "Tercera ley de Newton (sección 4.5)"
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 4 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_04.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 6.", url: "/lecturas/lectura_semana6.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 6", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=50178", icon: FileText },
            { text: "Práctica 6", url: "/practicas/practica_semana6.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 5", url: "/soluciones/solucion_practica_semana5.pdf", icon: Calculator },
            { text: "Phet: Leyes de Newton", url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=es", icon: Link }
        ]
    },
    7: {
        id: 7, title: "Aplicación de las Leyes de Newton",
        image: "https://images.unsplash.com/photo-1569406125624-98ee19b01d4a?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Identificar las fuerzas que actúan sobre un cuerpo en un diagrama de cuerpo libre (DCL).",
            "Usar la primera ley de Newton para resolver problemas donde intervienen fuerzas que actúan sobre un cuerpo en equilibrio",
            "Usar la segunda ley de Newton para resolver problemas donde intervienen fuerzas que actúan sobre un cuerpo con aceleración."
        ],
        contenidos: [
            "Diagramas de cuerpo libre (sección 4.6).",
            "Empleo de la primera ley de Newton: partículas en equilibrio (sección 5.1).",
            "Uso de la segunda ley de Newton: dinámica de partículas (sección 5.2).",
            "fuerzas de fricción (sección 5.3).",
            "Fuerzas fundamentales de la naturaleza (sección 5.5)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 5 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_05.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 7.", url: "/lecturas/lectura_semana7.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 6 (misma actividad formativa de Semana 6)", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=50178", icon: FileText },
            { text: "Práctica 7", url: "/practicas/practica_semana7.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 6", url: "/soluciones/solucion_practica_semana6.pdf", icon: Calculator },
            { text: "Phet: Leyes de Newton", url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=es", icon: Link }
        ]
    },
    8: {
        id: 8, title: "MCU, velocidad relativa y Fuerza gravitacional",
        image: "https://images.unsplash.com/photo-1711560217836-f42ac4a11a4f?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Analizar el movimiento en una trayectoria circular con rapidez constante.",
            "Relacionar la fuerza neta en un movimiento circular uniforme con la aceleración centrípeta.",
            "Relacionar la velocidad de un cuerpo en movimiento visto desde dos marcos de referencia distintos.",
            "Calcular las fuerzas gravitacionales que dos cuerpos cualesquiera ejercen uno sobre el otro.",
            "Relacionar el peso de un objeto con la expresión general de la fuerza gravitacional."
        ],
        contenidos: [
            "Movimiento en círculo (sección 3.4) y Dinámica del movimiento circular (sección 5.4).",
            "Velocidad relativa (sección 3.5)",
            "Uso de la segunda ley de Newton: dinámica de partículas (sección 5.2).",
            "Ley de Newton de la gravitación y peso (secciones 13.1 y 13.2)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 3, Capítulo 5 y Capítulo 13 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_03.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 8.", url: "/lecturas/lectura_semana8.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 8", url: "/practicas/practica_semana8.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 7", url: "/soluciones/solucion_practica_semana7.pdf", icon: Calculator }
        ]
    },
    9: {
        id: 9, title: "Trabajo y energía",
        image: "https://images.unsplash.com/photo-1599405032290-29d6e9e7274c?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir los conceptos: trabajo, energía cinética, energía potencial, fuerza conservativa y energía mecánica.",
            "Calcular el trabajo efectuado por una fuerza sobre un cuerpo.",
            "Relacionar el trabajo neto efectuado sobre un cuerpo con el cambio de energía cinética experimentado.",
            "Resolver problemas aplicando los conceptos de trabajo y energía, en contextos con fuerzas conservativas y no conservativas."
        ],
        contenidos: [
            "Trabajo (sección 6.1).",
            "Energía cinética y el teorema trabajo – energía (sección 6.2).",
            "Energía potencial gravitacional (sección 7.1).",
            "Energía potencial elástica (sección 7.2).",
            "Fuerzas conservativas y no conservativas (sección 7.3)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 6 y Capítulo 7 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_06.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 9.", url: "/lecturas/lectura_semana9.pdf", icon: FileText }
        ],
        evaluaciones: [
            // { text: "Actividad formativa 7", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/tda-motor-juegos/gaap_evaluator?ASIG_ID=50585", icon: FileText },
            { text: "Práctica 9", url: "/practicas/practica_semana9.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 8", url: "/soluciones/solucion_practica_semana8.pdf", icon: Calculator }
        ]
    },
    10: {
        id: 10, title: "Fuerzas variables, potencia, fuerza y energia potencial",
        image: "https://images.unsplash.com/photo-1429772011165-0c2e054367b8?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Calcular el trabajo efectuado por una fuerza variable.",
            "Comprender el concepto de potencia como la tasa de cambio para efectuar trabajo.",
            "Determinar las propiedades de una fuerza conservativa conociendo la función de energía potencial correspondiente."
        ],
        contenidos: [
            "Trabajo y energía con fuerza variable (sección 6.3).",
            "Potencia (sección 6.4).",
            "Fuerza y energía potencial (sección 7.4)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 6 y Capítulo 7 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_06.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 10.", url: "/lecturas/lectura_semana10.pdf", icon: FileText }
        ],
        evaluaciones: [
        ],
        recursos: [
            { text: "Solución Práctica Semana 9", url: "/soluciones/solucion_practica_semana9.pdf", icon: Calculator }
        ]
    },
    11: {
        id: 11, title: "Cantidad de movimiento, impulso y colisiones",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir los conceptos: cantidad de movimiento, impulso y centro de masa.",
            "Relacionar el impulso de la fuerza neta que actúa sobre una partícula y el cambio en su cantidad de movimiento.",
            "Resolver problemas en los que dos o más cuerpos colisionan entre sí, a partir de la conservación de la cantidad de movimiento total del sistema.",
            "Diferenciar entre colisiones elásticas, inelásticas y totalmente inelásticas."
        ],
        contenidos: [
            "Cantidad de movimiento e impulso (sección 8.1).",
            "Conservación de la cantidad de movimiento (sección 8.2).",
            "Conservación de la cantidad de movimiento y choques (sección 8.3).",
            "Choques elásticos (sección 8.4).",
            "Centro de masa (sección 8.5)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 8 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/classes/FI/FI1101/V-1-2024.CA.FI1101.1/file-storage/view/libro%2FCapitulo_08.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de sesión 11.", url: "/lecturas/lectura_semana11.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 11", url: "/practicas/practica_semana11.pdf", icon: Calculator },
        ],
        recursos: [
            { text: "Phet: Laboratorio de colisiones", url: "https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_all.html?locale=es", icon: Link }
        ],
    },
    12: {
        id: 12, title: "Cinemática del movimiento rotacional",
        image: "https://images.unsplash.com/photo-1763393567638-3ab4969974ed?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Describir la rotación de un cuerpo rígido en términos de las coordenadas, la velocidad y la aceleración angulares.",
            "Analizar la rotación de un cuerpo rígido cuando la aceleración angular es constante.",
            "Relacionar la rotación de un cuerpo rígido con la velocidad y la aceleración lineales de un punto en el cuerpo."
        ],
        contenidos: [
            "Velocidad y aceleración angulares (sección 9.1).",
            "Rotación con aceleración angular constante (sección 9.2).",
            "Relación entre cinemática lineal y cinemática angular (sección 9.3)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 9 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_09.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de SEMANA 12.", url: "/lecturas/lectura_semana12.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 12", url: "/practicas/practica_semana12.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 11", url: "/soluciones/solucion_practica_semana11.pdf", icon: Calculator }
        ]
    },
    13: {
        id: 13, title: "Rotación de cuerpos rígidos",
        image: "https://images.unsplash.com/photo-1659983637890-fe3ce747ed33?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Relacionar la energía cinética de rotación con el momento de inercia de un cuerpo en torno a un eje de rotación.",
            "Relacionar los valores del momento de inercia de un cuerpo para dos ejes de rotación diferentes, pero paralelos.",
            "Relacionar la rotación de un cuerpo rígido con la velocidad y la aceleración lineales de un punto en el cuerpo."
        ],
        contenidos: [
            "Energía en el movimiento de rotación (sección 9.4).",
            "Teorema de los ejes paralelos (sección 9.5).",
            "Cálculos de momento de inercia (sección 9.6)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 9 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_09.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de SEMANA 13.", url: "/lecturas/lectura_semana13.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 13", url: "/practicas/practica_semana13.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 12", url: "/soluciones/solucion_practica_semana12.pdf", icon: Calculator }
        ]
    },
    14: {
        id: 14, title: "Dinámica del movimiento de rotación",
        image: "https://images.unsplash.com/photo-1707194402198-167726d7f687?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Determinar como la torca neta sobre un cuerpo afecta su movimiento de rotación.",
            "Analizar el movimiento de un cuerpo que gira y se mueve como un todo en el espacio."
        ],
        contenidos: [
            "Torca (sección 10.1).",
            "Torca y aceleración angular de un cuerpo rígido (sección 10.2).",
            "Rotación de un cuerpo rígido en torno a un eje móvil (sección 10.3)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 10 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_10.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de SEMANA 14.", url: "/lecturas/lectura_semana14.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 14", url: "/practicas/practica_semana14.pdf", icon: Calculator },
            // { text: "Actividad formativa 9", url: "#", icon: FileText }
        ],
        recursos: [
            { text: "Solución Práctica Semana 13", url: "/soluciones/solucion_practica_semana13.pdf", icon: Calculator }
        ]
    },
    15: {
        id: 15, title: "Equilibrio estático",
        image: "https://images.unsplash.com/photo-1656090756308-e2cfced43780?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Reconocer las condiciones que deben satisfacerse para que un cuerpo o una estructura estén en equilibrio.",
            "Relacionar la posición del centro de gravedad de un objeto con su estabilidad.",
            "Resolver problemas que implican cuerpos rígidos en equilibrio."
        ],
        contenidos: [
            "Condiciones de equilibrio (sección 11.1).",
            "Centro de gravedad (sección 11.2)",
            "Solución de problemas de equilibrio de cuerpos rígidos (sección 11.3)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 11 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/catedras.tec/catedradefsicagenerali/file-storage/view/libro%2FCapitulo_11.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de SEMANA 15.", url: "/lecturas/lectura_semana15.pdf", icon: FileText }
        ],
        evaluaciones: [
            { text: "Práctica 15", url: "/practicas/practica_semana15.pdf", icon: Calculator }
        ],
        recursos: [
            { text: "Solución Práctica Semana 14", url: "/soluciones/solucion_practica_semana14.pdf", icon: Calculator }
        ]
    },
    16: {
        id: 16, title: "Momentum Angular",
        image: "https://images.unsplash.com/photo-1682953390639-381112a2c4f0?auto=format&fit=crop&q=80&w=1000",
        objetivos: [
            "Definir los conceptos: momento angular, trabajo y potencia en la rotación.",
            "Explicar el teorema de conservación del momento angular.",
            "Resolver problemas aplicando los conceptos de momento angular."
        ],
        contenidos: [
            "Trabajo y potencia en movimiento de rotación (sección 10.4).",
            "Momento angular (sección 10.5).",
            "Conservación del momento angular (sección 10.6)."
        ],
        consignas: [
            { text: "Revisar las secciones correspondientes del Capítulo 10 del libro principal de consulta.", url: "https://tecdigital.tec.ac.cr/dotlrn/classes/FI/FI1101/V-1-2024.CA.FI1101.1/file-storage/view/libro%2FCapitulo_10.pdf", icon: BookOpen },
            { text: "Estudiar el resumen de Semana 16.", url: "/lecturas/lectura_semana16.pdf", icon: FileText }
        ],
        evaluaciones: [],
        recursos: []
    }
};
