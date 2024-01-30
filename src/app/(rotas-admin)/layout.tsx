import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import * as usuarioServices from "@/shared/services/usuario.services";

export default async function RotasAdmin({children}:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  await usuarioServices.validaUsuario();
  if (!session || !['ADM', 'SUP', 'DEV'].includes(session.usuario.permissao)) {
    redirect('/login');
  }
  return <>{children}</>;
}