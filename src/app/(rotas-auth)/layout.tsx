import { authOptions } from '@/shared/auth/authOptions';
import { IUsuario } from '@/types/usuario/usuario.dto';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import * as usuarioServices from '@/shared/services/usuario/usuario.services';
import { signOut } from 'next-auth/react';

export default async function RotasAuth({children}:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const usuario: IUsuario = await usuarioServices.validaUsuario();
  if (!usuario) {
    if (typeof window !== "undefined") {
      await signOut({ redirect: false });
      redirect('/login');
    }
  }
  return <>{children}</>;
}