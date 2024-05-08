import { Badge, ListItemDecorator } from "@mui/joy";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


export default function ListDecoration(props: any) {
    return (
        <ListItemDecorator>
        <Badge badgeContent={props.valor} color="primary" max={9}>
          { props.tipo == 1 ? <PeopleAltIcon /> : <PendingActionsIcon /> }
        </Badge>
      </ListItemDecorator>
    );
}