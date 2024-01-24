'use client'

import Content from '@/components/Content';
import * as z from 'zod';
import { inicialSchema } from './schema';
import { TabList, Tabs, tabClasses, Tab, TabPanel } from '@mui/joy';
import { styled } from '@mui/joy/styles';
import React from 'react';
import DadosIniciaisTab from '../tabs/inicial';

type FormData = z.infer<typeof inicialSchema>;

const StyledInput = styled('input')({
    border: 'none',
    minWidth: 0,
    outline: 0,
    padding: 0,
    paddingTop: '1em',
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&::placeholder': {
        opacity: 0,
        transition: '0.1s ease-out',
    },
    '&:focus::placeholder': {
        opacity: 1,
    },
    '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
        top: '0.5rem',
        fontSize: '0.75rem',
    },
    '&:focus ~ label': {
        color: 'var(--Input-focusedHighlight)',
    },
    '&:-webkit-autofill': {
        alignSelf: 'stretch', // to fill the height of the root slot
    },
    '&:-webkit-autofill:not(* + &)': {
        marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
        paddingInlineStart: 'var(--Input-paddingInline)',
        borderTopLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        borderBottomLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    },
});
  
const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));
  
const InnerInput = React.forwardRef<
    HTMLInputElement,
    JSX.IntrinsicElements['input']
    >(function InnerInput(props, ref) {
    return (
        <React.Fragment>
        <StyledInput {...props} />
        <StyledLabel htmlFor={props.id}>{props.placeholder}</StyledLabel>
        </React.Fragment>
    );
});

export default function InicialDetalhes(props: any) {
    const { id } = props.params;
    return (
        <Content 
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina='inicial'
            breadcrumbs={[{
                label: 'Inicial',
                href: '/inicial'
            },{
                label: 'Detalhes',
                href: '/inicial/detalhes'
            }]}
        >
                    <Tabs
                        defaultValue={0}
                        sx={{
                            borderRadius: 'lg',
                            boxShadow: 'sm',
                            overflow: 'auto',
                            flexGrow: 1,
                            '&::-webkit-scrollbar': {
                                width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'var(--joy-palette-background-level1)',
                                borderRadius: '10px',
                            }
                        }}
                    >
                        <TabList
                            disableUnderline
                            tabFlex={1}
                            sticky='top'
                            sx={{
                                [`& .${tabClasses.root}`]: {
                                    fontSize: 'sm',
                                    fontWeight: 'lg',
                                    [`&[aria-selected="true"]`]: {
                                        color: 'primary.500',
                                        bgcolor: 'background.surface',
                                    },
                                    [`&.${tabClasses.focusVisible}`]: {
                                        outlineOffset: '-4px',
                                    },
                                },
                            }}
                        >
                            <Tab variant="soft" >
                                Dados iniciais
                            </Tab>
                            { id && <>
                            <Tab variant="soft">
                                Distribuição
                            </Tab>
                            <Tab variant="soft">
                                Admissibilidade
                            </Tab>
                            <Tab variant="soft">
                                Coord. SMUL
                            </Tab>
                            <Tab variant="soft">
                                Secretarias
                            </Tab>
                            <Tab variant="soft" >
                                Conclusão
                            </Tab></>}
                        </TabList>
                        <TabPanel value={0} sx={{ 
                            flexGrow: 1,
                            '&::-webkit-scrollbar': {
                              width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'var(--joy-palette-background-level1)',
                              borderRadius: '10px',
                            }
                        }}>
                            <DadosIniciaisTab id={id} />
                        </TabPanel>
                        <TabPanel value={1}>
                            Distribuição
                        </TabPanel>
                        <TabPanel value={2}>
                            Admissibilidade
                        </TabPanel>
                        <TabPanel value={3}>
                            Coord. SMUL
                        </TabPanel>
                        <TabPanel value={4}>
                            Secretarias
                        </TabPanel>
                        <TabPanel value={5}>
                            Conclusão
                        </TabPanel>
                    </Tabs>
                    
        </Content>
    );
}
