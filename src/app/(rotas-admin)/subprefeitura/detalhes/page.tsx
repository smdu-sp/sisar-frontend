'use client'

import subprefeituraDetalhes from './[id]/page';

export const dynamicParams = true

export default function UnidadeNova(props: any) {
    return subprefeituraDetalhes(props);
}