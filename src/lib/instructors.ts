import type { Instructor } from '../types';

export const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export const INSTRUCTORS_DATA: Instructor[] = [
  {
    docente: "CAMBRONERO CORDERO MICHAEL",
    atenciones: [
      {
        dia: "Martes",
        modalidad: "virtual",
        hora: "1:30 p.m. a 3:30 p.m.",
        detalle: "mensaje a prof_mcambronero@estudiantec.cr en TEAMS"
      },
      {
        dia: "Jueves",
        modalidad: "virtual",
        hora: "1:30 p.m. a 3:30 p.m.",
        detalle: "mensaje a prof_mcambronero@estudiantec.cr en TEAMS"
      }
    ]
  },
  {
    docente: "CHAVES ALVAREZ MARCELA",
    atenciones: [
      {
        dia: "Martes",
        modalidad: "presencial",
        hora: "9:00 a.m. a 11:30 a.m.",
        detalle: "oficina 10, Escuela de Ciencias Naturales y Exactas"
      }
    ]
  },
  {
    docente: "CORRALES QUESADA ESTEBAN",
    atenciones: [
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "1:00 p.m. a 2:50 p.m.",
        detalle: "oficina 06, edificio C4 (Escuela de Física)"
      },
      {
        dia: "Viernes",
        modalidad: "presencial",
        hora: "1:00 p.m. a 2:50 p.m.",
        detalle: "oficina 06, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "ELIZONDO ZÚÑIGA JENNIFER",
    atenciones: [
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "7:30 a.m. a 9:30 a.m.",
        detalle: "oficina 27, edificio C4 (Escuela de Física)"
      },
    ]
  },
  {
    docente: "LACY MORA GERARDO",
    atenciones: [
      { dia: "Martes", modalidad: "virtual", hora: "1:30 p.m. a 3:30 p.m.", detalle: "mensaje a prof_glacy@estudiantec.cr en TEAMS" },
      { dia: "Jueves", modalidad: "virtual", hora: "1:30 p.m. a 3:30 p.m.", detalle: "mensaje a prof_glacy@estudiantec.cr en TEAMS" },
    ]
  },
  {
    docente: "MURILLO SALAZAR DENNIS",
    atenciones: [
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "7:00 a.m. a 9:00 a.m.",
        detalle: "oficina 05, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "MURILLO ZUMBADO GUSTAVO",
    atenciones: [
      {
        dia: "Jueves",
        modalidad: "presencial",
        hora: "7:30 a.m. a 9:20 a.m.",
        detalle: "oficina 26, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "PINEDA LIZANO JUAN JOSÉ",
    atenciones: [
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "1:00 p.m. a 3:00 p.m.",
        detalle: "oficina 7, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "ROJAS PÉREZ FRANCISCO",
    atenciones: [
      {
        dia: "Viernes",
        modalidad: "virtual",
        hora: "10:00 a.m. a 12:00 m.d.",
        detalle: "mensaje a prof_frojas@estudiantec.cr en TEAMS"
      }
    ]
  },
  {
    docente: "ROJAS SANTAMARÍA FERNANDO",
    atenciones: [
      {
        dia: "Martes",
        modalidad: "presencial",
        hora: "2:00 p.m. a 4:00 p.m.",
        detalle: "Oficina 10 Escuela de Ciencias Naturales y Exactas."
      },
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "10:00 a.m. a 12:00 m.d.",
        detalle: "Oficina 10 Escuela de Ciencias Naturales y Exactas."
      }
    ]
  },
  {
    docente: "SEGURA CARVAJAL MARCOS",
    atenciones: [
      {
        dia: "Martes",
        modalidad: "presencial",
        hora: "3:00 p.m. a 5:00 p.m.",
        detalle: "oficina 14, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "SEGURA ZÁRATE ANA YANCY",
    atenciones: [
      {
        dia: "Miércoles",
        modalidad: "presencial",
        hora: "1:00 p.m. a 2:50 p.m.",
        detalle: "oficina 22, edificio C4 (Escuela de Física)"
      },
      {
        dia: "Viernes",
        modalidad: "presencial",
        hora: "1:00 p.m. a 2:50 p.m.",
        detalle: "oficina 22, edificio C4 (Escuela de Física)"
      }
    ]
  },
  {
    docente: "VARGAS BLANCO IVÁN",
    atenciones: [
      {
        dia: "Jueves",
        modalidad: "virtual",
        hora: "4:00 p.m. a 5:00 p.m.",
        detalle: "https://itcr.zoom.us/j/82619451453?pwd=IEQuahoa2KiBGbWNakxOaCJT7hivcM.1"
      },
      {
        dia: "Jueves",
        modalidad: "virtual",
        hora: "6:00 p.m. a 7:00 p.m.",
        detalle: "Zoom: https://itcr.zoom.us/j/85281949494?pwd=X1cG7EWGTXkFYI8ajeaMcbYlW3zzes.1"
      }
    ]
  }
];

export interface Attention {
  dia: string;
  modalidad: 'presencial' | 'virtual';
  hora: string;
  detalle: string;
}

export interface Instructor {
  docente: string;
  atenciones: Attention[];
}