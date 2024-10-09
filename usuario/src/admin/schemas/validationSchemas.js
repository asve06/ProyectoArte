import { z } from 'zod';
import dayjs from 'dayjs';

// Esquema de validación para obras
const obraSchema = z.object({
  titulo: z.string().min(1, { message: "El título es requerido" }),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
  autor_id: z.number().min(1, { message: "El autor es requerido" }),
  fecha_creacion: z.string().refine((value) => dayjs(value).isValid(), {
    message: "Fecha inválida",
  }),
  ubicacion_id: z.number().min(1, { message: "La ubicación es requerida" }),
  palabras_clave: z.string().min(1, { message: "Palabras clave son requeridas" }),
  url_imagen: z.string().min(1, { message: "La URL de la imagen es requerida" }),
  adicionales: z.object({}).optional(),
  tipo_obra: z.string().min(1, { message: "El tipo de obra es requerido" }),
  detalles: z.object({
    // Validaciones para pinturas
    tecnica_id: z.union([z.number(), z.string()]).optional(),
    estado_conservacion: z.string().optional(),
    dimensiones: z.string().optional(),
    movimiento_id: z.union([z.number(), z.string()]).optional(),
    // Validaciones para publicaciones
    editor: z.string().optional(),
    lugar_publicacion: z.string().optional(),
    generos: z.string().optional(),
    idioma: z.string().optional(),
    numero_paginas: z.string().optional(),
    // Validaciones para multimedia
    tipo_multimedia: z.string().optional(),
    duracion: z.string().optional(),
    formato: z.string().optional(),
  }),
});

// Validaciones específicas por tipo de obra
const pinturaSchema = obraSchema.extend({
  detalles: z.object({
    tecnica_id: z
    .union([z.string(), z.number()])
    .nullable()
    .refine((val) => (val !== null && val !== ""), { message: "La técnica es requerida" }),


    estado_conservacion: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El estado de conservación es requerido",
    }),
    dimensiones: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "Las dimensiones son requeridas",
    }),
    movimiento_id: z
    .union([z.string().transform((val) => val === '' ? undefined : val), z.number()])
    .refine((val) => val !== undefined, { message: "La técnica es requerida" }),
  }),
});

const publicacionSchema = obraSchema.extend({
  detalles: z.object({
    editor: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El editor es requerido",
    }),
    lugar_publicacion: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El lugar de publicación es requerido",
    }),
    generos: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "Los géneros son requeridos",
    }),
    idioma: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El idioma es requerido",
    }),
    numero_paginas: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El número de páginas es requerido",
    }),
  }),
});

const multimediaSchema = obraSchema.extend({
  detalles: z.object({
    tipo_multimedia: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El tipo de multimedia es requerido",
    }),
    duracion: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "La duración es requerida",
    }),
    formato: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
      message: "El formato es requerido",
    }),
  }),
});

export { obraSchema, pinturaSchema, publicacionSchema, multimediaSchema };
