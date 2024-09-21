import zod from 'zod';

const articuloSchema = zod.object({
    id: zod.number(),
    titulo: zod.string(),
    cuerpo: zod.string(),
    usuario: zod.string()
})

export const validarArticulo = (articulo) => {
    return articuloSchema.safeParse(articulo);
}

export const validarParcial = (articulo) => {
    return articuloSchema.partial().safeParse(articulo);
}