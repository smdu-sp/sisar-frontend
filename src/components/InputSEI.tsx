import { Input } from "@mui/joy";
import { IMaskInput } from 'react-imask';
import React from "react";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export default function InputSEI({ ...props }): React.ReactElement {
    const { mask, definitions, ...other } = props;
    const MaskAdapter = React.forwardRef<HTMLElement, CustomProps>(
        function MaskAdapter(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask={mask}
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