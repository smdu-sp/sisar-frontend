"use client";

import React, { useState, useEffect } from "react";
import CardDashboard from "@/components/Dashboard/CardDashboard";
import { GraficoPizza } from "@/components/Dashboard/GraficoPizza";
import { Box } from "@mui/material";
import Content from "@/components/Content";
import { numeroPrazoExcedido } from "@/shared/services/admissibilidade.services";
import { numeroDentroPrazo } from "@/shared/services/admissibilidade.services";
import { admissibilidadeFinalizada } from "@/shared/services/admissibilidade.services";
import { medianaAdmissibilidade } from "@/shared/services/admissibilidade.services";

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

  return (
    <Content>
  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mb={2}>
    <CardDashboard
      etapa={"Admissibilidade Finalizada"}
      value={
        numeroFinalizadas !== null
          ? numeroFinalizadas.toString()
          : "Carregando..."
      }
      icone="Done"
      cor="#4caf50"
    />
    <CardDashboard
      etapa={"Dentro do prazo"}
      value={
        dentroDoPrazo !== null ? dentroDoPrazo.toString() : "Carregando..."
      }
      icone="Hourglass"
      cor="#0a3299"
    />
    <CardDashboard
      etapa={"Fora do prazo"}
      value={
        foraDoPrazo !== null ? foraDoPrazo.toString() : "Carregando..."
      }
      icone="HourglassDisabledIcon"
      cor="#f94668"
    />
    <CardDashboard
      etapa={"Mediana tempo de análise"}
      value={
        valorMedianaAdmissibilidade !== null
          ? valorMedianaAdmissibilidade.toString()
          : "Carregando..."
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
  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mb={2}>
    <GraficoPizza
      titulo={"Admissibilidade"}
      chartSeries={[85, 15]}
      labels={["Dentro do Prazo", "Fora do Prazo"]}
      sx={{ height: "100%" }}
    />
  </Box>
</Content>
  );
}
