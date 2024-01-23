import { Input } from "@mui/joy";
import { IMaskInput } from 'react-imask';
import React from "react";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export default function MaskedInput({ ...props }): React.ReactElement {
    console.log(props);
    const { mask, definitions, id, ...other } = props;
    const MaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
        function MaskAdapter(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask={mask}
                    id={id}
                    definitions={definitions}
                    inputRef={ref}
                    onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        },
    );
    return (
        <Input 
            {...other}
            slotProps={{ input: { component: MaskAdapter }}}
        />
    );
  }