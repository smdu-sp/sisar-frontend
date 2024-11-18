"use client";

import React, { useState, useEffect } from "react";
import CardDashboard from "@/components/Dashboard/CardDashboard";
import { GraficoPizza } from "@/components/Dashboard/GraficoPizza";
import { Box, Grid, CircularProgress } from "@mui/material";
import Content from "@/components/Content";
import { numeroPrazoExcedido } from "@/shared/services/admissibilidade.services";
import { numeroDentroPrazo } from "@/shared/services/admissibilidade.services";
import { admissibilidadeFinalizada } from "@/shared/services/admissibilidade.services";
import { medianaAdmissibilidade } from "@/shared/services/admissibilidade.services";
import Tabela from "@/components/Dashboard/Tabela";

export default function Dashboard() {
  const [foraDoPrazo, setForaDoPrazo] = useState<number | null>(null);

  useEffect(() => {
    const fetchForaDoPrazo = async () => {
      try {
        const count = await numeroPrazoExcedido();
        setForaDoPrazo(count);
      } catch (error) {
        console.error("Erro ao buscar o número de prazos excedidos:", error);
      }
    };

    fetchForaDoPrazo();
  }, []);

  const [dentroDoPrazo, setDentroDoPrazo] = useState<number | null>(null);

  useEffect(() => {
    const fetchDentroDoPrazo = async () => {
      try {
        const count = await numeroDentroPrazo();
        setDentroDoPrazo(count);
      } catch (error) {
        console.error("Erro ao buscar o número de prazos excedidos:", error);
      }
    };

    fetchDentroDoPrazo();
  }, []);

  const [numeroFinalizadas, setQuantidadeAdmissibilidadeFinalizada] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchQuantidadeAdmissibilidadeFinalizada = async () => {
      try {
        const count = await admissibilidadeFinalizada();
        setQuantidadeAdmissibilidadeFinalizada(count);
      } catch (error) {
        console.error("Erro ao buscar o número de prazos excedidos:", error);
      }
    };

    fetchQuantidadeAdmissibilidadeFinalizada();
  }, []);

  const [valorMedianaAdmissibilidade, setMedianaAdmissibilidade] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchMedianaAdmissibilidade = async () => {
      try {
        const count = await medianaAdmissibilidade();
        setMedianaAdmissibilidade(count);
      } catch (error) {
        console.error("Erro ao buscar o número de prazos excedidos:", error);
      }
    };

    fetchMedianaAdmissibilidade();
  }, []);

  const total = dentroDoPrazo && foraDoPrazo ? dentroDoPrazo + foraDoPrazo : 0;
  const dentroPorcentagem = total ? (dentroDoPrazo / total) * 100 : 0;
  const foraPorcentagem = total ? (foraDoPrazo / total) * 100 : 0;

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
          <Tabela
            processo="2222"
            dtinicio="25/11/2025"
            dtfinal="26/10/2026"
            dias="6"
            status="vencido"
          />
        </Grid>
      </Grid>
    </Content>
  );
}
