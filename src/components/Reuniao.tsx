import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Chip, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Input, Modal, ModalDialog, Skeleton, Stack, Textarea } from "@mui/joy";
import * as reunioes from '@/shared/services/reunioes.services';
import { Check } from '@mui/icons-material';
import { AlertsContext } from '@/providers/alertsProvider';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from 'zod';
import {
    infer as Infer,
    number,
    string,
} from "zod";

const schema = z.object({
    nova_data_reuniao: date(),
    motivo: string().min(2, { message: "O motivo deve ter pelo menos 1 letras" }),

});

type Schema = Infer<typeof schema>;

export default function Reuniao(props: any) {
    const [motivo, setMotivo] = useState('');
    const [dias, setDias] = useState<number[]>([]);
    const [nova_data_reuniao, setNova_data_reuniao] = useState<Date>(new Date());
    const [inicial, setInicial] = useState('');
    const today = new Date();
    const { setAlert } = React.useContext(AlertsContext);
    const [carregando, setCarregando] = useState(true);

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid, isSubmitted }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: {
            nova_data_reuniao,
            motivo,
        }
    });

    const onSubmit = (data: Schema) => {
        reunioes.reagendarReuniao(props.id, data.nova_data_reuniao, data.motivo).then((response) => {
            if (response) {
                props.setOpen(false);
                setMotivo('');
                setDias([]);
                props.buscarData();
                setNova_data_reuniao(new Date(today.toLocaleDateString('pt-BR').split('/').reverse().join('-')));
                props.buscar(getValues().nova_data_reuniao.toLocaleDateString('pt-BR').split('/').reverse().join('-'));
                setAlert('Reagendação feita', 'Reunião reagendada com sucesso!', 'success', 3000, Check);
                reset();
            }
        })
    }
    useEffect(() => {
        setCarregando(false);
    }, [carregando]);
    return (
        <Modal open={props.open} onClose={() => props.setOpen(false)}>
            <ModalDialog>
                <DialogTitle>Reagendar Reunião</DialogTitle>
                <DialogContent>{inicial}</DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Data Reunião</FormLabel>
                            <Chip color='primary' variant='soft' sx={{ fontSize: '19px', color: 'neutral.softActiveColor' }}>{props.dataCard}</Chip>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nova data</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="nova_data_reuniao"
                                control={control}
                                defaultValue={new Date(nova_data_reuniao.toLocaleString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Data Lembrete"
                                            error={Boolean(errors.nova_data_reuniao)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value + 'T03:00:00.000Z');
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name={field.name}
                                        />
                                        {errors.nova_data_reuniao && <FormHelperText color="danger">
                                            {errors.nova_data_reuniao?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Motivo</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="motivo"
                                control={control}
                                defaultValue={motivo}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Textarea
                                            minRows={2}
                                            placeholder="Motivo"
                                            error={Boolean(errors.motivo)}
                                            {...field}
                                        />
                                        {errors.motivo && <FormHelperText color="danger">
                                            {errors.motivo?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                        <Button type='submit' variant='soft' disabled={!isValid} >Alterar</Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    )
}