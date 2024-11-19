import * as React from "react";
import Table from "@mui/joy/Table";
import { RegistroAdmissibilidade } from "@/app/(rotas-admin)/dashboard/admissibilidade/page";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TabelaProps {
 dados: RegistroAdmissibilidade []
}

export default function Tabela({ dados }: TabelaProps) {
 
  return (
    <Table>  
      <thead>
        <tr>
          <th>Processo</th>
          <th>Data Início Admissibilidade</th>
          <th>Data Final Admissibilidade</th>
          <th>Dias</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((row) => (
          <tr key={row.sei}>
            <td>{row.sei}</td> 
            <td>{format(
                      new Date(row.envioAdmissibilidade),
                      "dd/MM/yyyy",                      
                    )}</td>
                    <td>
           {format(
                      new Date(row.dataDecisaoInterlocutoria),
                      "dd/MM/yyyy",                      
                    )}</td>
            <td>{row.dias}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
