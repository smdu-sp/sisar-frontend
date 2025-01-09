"use client";

import React, { useState, useEffect } from "react";
import CardDashboard from "@/components/Dashboard/CardDashboard";
import { GraficoPizza } from "@/components/Dashboard/GraficoPizza";
import { Box, Grid, CircularProgress, Pagination } from "@mui/material";
import Content from "@/components/Content";
import {
  numeroPrazoExcedido,
  numeroDentroPrazo,
  admissibilidadeFinalizada,
  medianaAdmissibilidade,
  pegarRegistrosAdmissibilidade,
} from "@/shared/services/admissibilidade/admissibilidade.services";
import Tabela from "@/components/Dashboard/Tabela";

export interface RegistroAdmissibilidade {
  dataDecisaoInterlocutoria: string;
  sei: string;
  envioAdmissibilidade: string;
  dias: number;
  status: string;
}

export default function Dashboard() {
  

  const [registrosAdmissibilidade, setRegistrosAdmissibilidade] = useState<
    RegistroAdmissibilidade[] | null
  >(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 5;

  useEffect(() => {
    const fetchRegistrosAdmissibilidade = async () => {
      try {
        const response = await pegarRegistrosAdmissibilidade();
        setRegistrosAdmissibilidade(response);
      } catch (error) {
        console.error("Erro ao buscar os registros de admissibilidade:", error);
      }
    };

    fetchRegistrosAdmissibilidade();
  }, []);

  const [foraDoPrazo, setForaDoPrazo] = useState<number | null>(null);
  const [dentroDoPrazo, setDentroDoPrazo] = useState<number | null>(null);
  const [numeroFinalizadas, setQuantidadeAdmissibilidadeFinalizada] =
    useState<number | null>(null);
  const [valorMedianaAdmissibilidade, setMedianaAdmissibilidade] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fora, dentro, finalizadas, mediana] = await Promise.all([
          numeroPrazoExcedido(),
          numeroDentroPrazo(),
          admissibilidadeFinalizada(),
          medianaAdmissibilidade(),
        ]);
        setForaDoPrazo(fora);
        setDentroDoPrazo(dentro);
        setQuantidadeAdmissibilidadeFinalizada(finalizadas);
        setMedianaAdmissibilidade(mediana);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const total = dentroDoPrazo && foraDoPrazo ? dentroDoPrazo + foraDoPrazo : 0;
  const dentroPorcentagem = total ? (dentroDoPrazo || 0  / total) * 100 : 0;
  const foraPorcentagem = total ? (foraDoPrazo || 0 / total) * 100 : 0;

  // Calcular os registros exibidos na página atual
  const inicio = (paginaAtual - 1) * registrosPorPagina;
  const fim = inicio + registrosPorPagina;
  const registrosExibidos = registrosAdmissibilidade
    ? registrosAdmissibilidade.slice(inicio, fim)
    : [];

  const totalPaginas = registrosAdmissibilidade
    ? Math.ceil(registrosAdmissibilidade.length / registrosPorPagina)
    : 0;

  return (
    <Content>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <CardDashboard
          etapa={"Admissibilidade Finalizada"}
          value={
            numeroFinalizadas !== null ? (
              numeroFinalizadas.toString()
            ) : (
              <CircularProgress size={20} />
            )
          }
          icone="Done"
          cor="#4caf50"
        />
        <CardDashboard
          etapa={"Dentro do prazo"}
          value={
            dentroDoPrazo !== null ? (
              dentroDoPrazo.toString()
            ) : (
              <CircularProgress size={20} />
            )
          }
          icone="Hourglass"
          cor="#0a3299"
        />
        <CardDashboard
          etapa={"Fora do prazo"}
          value={
            foraDoPrazo !== null ? (
              foraDoPrazo.toString()
            ) : (
              <CircularProgress size={20} />
            )
          }
          icone="HourglassDisabledIcon"
          cor="#f94668"
        />
        <CardDashboard
          etapa={"Mediana tempo de análise"}
          value={
            valorMedianaAdmissibilidade !== null ? (
              valorMedianaAdmissibilidade.toString()
            ) : (
              <CircularProgress size={20} />
            )
          }
          icone="Equalizer"
          cor="#8800e0"
        />
        <CardDashboard
          etapa={"Mediana tempo de análise (reconsideração)"}
          value={"1757"}
          icone="Equalizer"
          cor="#f26e14"
        />
      </Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <GraficoPizza
            titulo={"Admissibilidade"}
            chartSeries={[dentroPorcentagem, foraPorcentagem]}
            labels={["Dentro do Prazo", "Fora do Prazo"]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {registrosAdmissibilidade ? (
          
              <Tabela
                dados={registrosAdmissibilidade}
              />            
          ) : (
            <CircularProgress />
          )}
          <Box mt={2} display="flex" justifyContent="center">
            {registrosAdmissibilidade && (
              <Pagination
                count={totalPaginas}
                page={paginaAtual}
                onChange={(_, value) => setPaginaAtual(value)}
                color="primary"
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Content>
  );
}
