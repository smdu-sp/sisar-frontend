'use client'

import InicialDetalhes from './[id]/page';
import { useSearchParams } from 'next/navigation';

export const dynamicParams = true

export default function InicialNovo(props: any) {
    const searchParams = useSearchParams();
    const novoProcesso = searchParams.get('novo-processo');
    return InicialDetalhes(props, novoProcesso);
}
