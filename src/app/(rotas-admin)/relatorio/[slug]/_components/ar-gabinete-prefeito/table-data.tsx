/** @format */

import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const arrayMeses = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

const relatorio = {
	dados: [
		{
			ano: 2017,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2018,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2019,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2020,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2021,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2022,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2023,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487793, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
		{
			ano: 2024,
			processos: [47, 27, 48, 43, 20, 47, 27, 46, 48, 39, 29, 26],
			processos_aprovados: [16, 14, 24, 22, 7, 16, 9, 23, 24, 13, 14, 13],
			num_processo: [
				201800487794, 201801234567, 201807890123, 201803456789, 201809012345,
				201805678901, 201802345678, 201808901234, 201804567890, 201800123456,
				201804567890, 201800123456,
			],
			initial_time: [86, 18, 28, 73, 64, 56, 67, 64, 36, 28, 84, 58],
			analysis_time: [27, 21, 10, 25, 10, 11, 28, 18, 16, 10, 19, 16],
			category: [
				'HMP / HIS-1 / HIS2',
				'R2v / nR1 (Residencial)',
				'HMP',
				'EZEIS',
				'R2v-02 / nR1,R2v / nR1',
				'HIS',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
				'R2H',
				'NR2 NR1 R2V',
				'R2H-03',
			],
			responsavel: [
				'William Vitor de Souza',
				'Marcelo Saicaly Zapparoli',
				'Bruno Ribeiro Ferreira',
				'Amanda Bezerra da Silva',
				'Paulo Roberto Tanaka',
				'Magno Emílio Moreira Leite',
				'Abrão Elias Frankel',
				'Carlos Eduardo Monteiro',
				'Marcos Garrubbo',
				'Adriana Zampieri Albuquerque',
				'Mario Tiburcio Tiberio',
				'Tarjab Incorporadora LTDA',
				'Sérgio Mester',
			],
			empresa: [
				'biraja Empreendimentos Imobiliarios Spe Ltda.',
				'Idea Empreendimentos Spe 10 Ltda',
				'José Antonio Figueiredo Da Silva',
				'TDSP Nilo Empreendimentos Imobiliários Ltda.',
				'Ali Zohair Anka',
				'Cbr 048 Empreendimentos Imobiliários Ltda.',
				'Paes & Gregori LTDA',
				'Merc Engenharia E Arquitetura Ltda',
				'Idea Empreendimentos 31 Ltda.',
				'HR Participações LTDA',
				'Tenda Negócios Imobiliários S/A',
				' Ana Beatriz Warde Kouak e Outro',
			],
			catacteristica: [
				'1 prédio com 22 andraes e 152 unidades',
				'1 prédio com 18 andares e 294 unidades',
				'2 prédios, totalizando 54 andares e 2 subsolos.',
				'1 prédio com 19 andares e 33 unidades, mais 2 subsolos.',
				'1 prédio com 2 andares e 1 subsolo',
				'1 prédio com 32 andares, 116 unidades, 2 duplex e 3 subsolos',
				'1 prédio com 27 andares e 3 subsolos. ',
				'1 prédio com 27 andares e 50 unidades.',
				'1 prédio com 15 andares e 48 unidades',
				'1 prédio com 28 andares e 4 sbsolos. ',
				'5 blocos, com 1 prédio de 11 andares e 88 unidades em cada bloco.',
				'1 prédio, com 2 andares, 4 unidades e 1 subsolo.',
			],
			regiao: [
				'Zona Oeste',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Leste',
				'Zona Norte',
				'Zona Sul',
				'Centro',
				'Zona Sul',
				'Centro',
				'Zona Leste',
			],
		},
	],
};

const headerTable = [
	'Ano',
	'Mês',
	'Processos Protocolados Aprova Rápido',
	'Processos Aprovados',
	'Nº Processo',
	'Tempo de Análise Pedido Inicial',
	'Tempo de Análise de Recurso',
	'Categoria de Uso',
	'Responsável Pelo Projeto',
	'Empresa',
	'Característica do Projeto',
	'Região da Cidade',
];

export default function TableData() {
	return (
		<Grid
			style={{ paddingBottom: '16px', paddingTop: '16px' }}
			container>
			{relatorio.dados.map((ano, indexRelatorio) => {
				return (
					<Grid
						item
						key={indexRelatorio}
						style={{ paddingBottom: '16px' }}>
						<TableContainer component={Paper}>
							<Table
								aria-label='simple table'
								size='small'>
								<TableHead style={{ background: '#00a1b9' }}>
									<TableRow>
										{headerTable.map((item, index) => {
											return (
												<TableCell
													key={index}
													style={{
														color: '#fff',
														fontWeight: '700',
														fontSize: '12px',
														border: '1px solid #242424',
													}}
													align='center'>
													{item}
												</TableCell>
											);
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{ano.processos.map((processo, indexProcesso: number) => {
										return (
											<TableRow key={indexProcesso}>
												{indexProcesso === 0 && (
													<TableCell
														style={{
															fontWeight: 'bold',
															fontSize: '16px',
															border: '1px solid #242424',
														}}
														align='center'
														rowSpan={12}>
														{indexProcesso === 0 && ano.ano}
													</TableCell>
												)}
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{arrayMeses[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{processo}
												</TableCell>
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{ano.processos_aprovados[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{ano.num_processo[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{ano.initial_time[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														borderRight: '1px solid #242424',
													}}>
													{ano.analysis_time[indexProcesso]}
												</TableCell>{' '}
												<TableCell
													align='center'
													style={{
														fontSize: '12px',
														borderRight: '1px solid #242424',
													}}>
													{ano.category[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														fontSize: '12px',
														borderRight: '1px solid #242424',
													}}>
													{ano.responsavel[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														fontSize: '12px',
														borderRight: '1px solid #242424',
													}}>
													{ano.empresa[indexProcesso]}
												</TableCell>{' '}
												<TableCell
													align='center'
													style={{
														fontSize: '12px',
														borderRight: '1px solid #242424',
													}}>
													{ano.catacteristica[indexProcesso]}
												</TableCell>
												<TableCell
													align='center'
													style={{
														fontSize: '12px',
														borderRight: '1px solid #242424',
													}}>
													{ano.regiao[indexProcesso]}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				);
			})}
		</Grid>
	);
}
