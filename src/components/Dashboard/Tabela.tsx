import * as React from "react";
import Table from "@mui/joy/Table";

interface TabelaProps {
  processo: string;
  dtinicio: string;
  dtfinal: string;
  dias: string;
  status: string;
}

export default function Tabela({ processo, dtinicio, dtfinal, dias, status }: TabelaProps) {
 
  const rows = [
    {
      processo,
      dtinicio,
      dtfinal,
      dias,
      status,
    },
  ];

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
        {rows.map((row) => (
          <tr key={row.processo}>
            <td>{row.processo}</td> {/* Corrigido para exibir o processo */}
            <td>{row.dtinicio}</td>
            <td>{row.dtfinal}</td>
            <td>{row.dias}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
