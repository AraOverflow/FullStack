import zod from 'zod';

const usuarioSchema = zod.object({
    id: zod.number().min(1),
    nick: zod.string().min(1),
    password: zod.string().min(1),
    mail: zod.string().min(1)
})

export const validarUsuario = (usuario) => {
    return usuarioSchema.safeParse(usuario);
}