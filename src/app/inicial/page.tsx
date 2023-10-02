import Content from '@/components/Content';
import { Button } from '@mui/joy';

export default function Inicial() {
  return (
    <Content 
      titulo='Inicial'
      pagina='inicial'
      breadcrumbs={[{
        label: 'Inicial',
        href: ''
      }]}
    >
      <a href="/inicial/detalhes">
        <Button
          variant="solid"
          size='lg'
          sx={{
            position: 'absolute',
            bottom: 50,
            right: 50,
          }}
        >
          Novo
        </Button>
      </a>
    </Content>
  );
}
