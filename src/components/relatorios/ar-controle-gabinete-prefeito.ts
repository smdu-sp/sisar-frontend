export const getArControleGabinetePrefeito = async (month: string, year: string) => {
  // const quantitativo: IAprovaRapidoQuantitativoResponse = await getRelatorioArQuantitativo(month, year);
  // if (!quantitativo) throw new Error("Não existe relatório na variável quantitativo - PDF");
  const docDefinition = {
      content: [
        { text: 'Testando o pdf', style: 'classe_teste' }
      ],
  
      // Estilização via CSS personalizado
      styles: {
        classe_teste: {
          color: 'blue'
        }
      }
    };
    return docDefinition;
};
