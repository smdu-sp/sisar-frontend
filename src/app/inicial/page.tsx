import Content from '@/components/Content';

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
    </Content>
  );
}
