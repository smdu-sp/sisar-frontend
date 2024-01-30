import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import * as usuarioServices from "@/shared/services/usuario.services";

export default async function RotasAuth({children}:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  await usuarioServices.validaUsuario();
  if (!session) redirect('/login');
  return <>{children}</>;
}