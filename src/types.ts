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
