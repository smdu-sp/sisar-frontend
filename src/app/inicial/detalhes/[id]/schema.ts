import z from "zod";

export const inicialSchema = z.object({
    id: z.number().int().optional(),
    decreto: z.boolean().default(false).optional(),
    sei: z.string(),
    tipo_requerimento: z.string().default('1'),
    requerimento: z.string(),
    aprova_digital: z.string().optional(),
    processo_fisico: z.string().optional(),
    data_protocolo: z.date(),
    envio_admissibilidade: z.date().optional(),
    tipo_alvara: z.string(),
    tipo_processo: z.string(),
    obs: z.string().optional(),
    status: z.string().default('1'),
});

export type Inicial = z.infer<typeof inicialSchema>;