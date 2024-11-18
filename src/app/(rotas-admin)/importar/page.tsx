'use client'

import Content from '@/components/Content';
import { AlertsContext } from '@/providers/alertsProvider';
import { Box, Button, Card, FormControl, FormLabel, Option, Select, SvgIcon, styled } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function Importar() {
  const [ file, setFile ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>();
  const { setAlert } = useContext(AlertsContext);
  const router = useRouter();

  return (
    <Content 
      titulo='Importar'
      breadcrumbs={[{
        label: 'Importar',
        href: ''
      }]}
    >
      <Card
        size='lg'
        variant='outlined'
        sx={{
          width: { xs: '100%', sm: '70%', md: '50%' }
        }}
      >
        <FormControl>
          <FormLabel>Tipo de Arquivo</FormLabel>
          <Select>
            <Option value=''>Distribuição</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Arquivo</FormLabel>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
            sx={{ 
              width: { xs: '100%', sm: '70%', md: '50%', xl: '30%' } 
            }}
          >
            Upload
            <VisuallyHiddenInput value={file} type="file" onChange={(e) => setFile(e.target.value)} />
          </Button>
        </FormControl>
        <Box
          width={'full'}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button
            size='sm'
            variant='plain'
            color='neutral'
            onClick={() => router.back()}
            sx={{ mr: 1, borderRadius: 4 }}
          >
            Cancelar
          </Button>
          <Button
            size='sm'
            loading={loading}
            loadingPosition='start'
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setAlert('Success', 'Uploaded successfuly', 'success', 3000);
              }, 3000);
            }}
            sx={{ borderRadius: 4 }}
          >
            { loading ? 'Salvando...' : 'Salvar' }
          </Button>
        </Box>
      </Card>
    </Content>
  );
}
