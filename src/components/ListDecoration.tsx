import { Badge, ListItemDecorator } from "@mui/joy";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function ListDecoration(props: any) {
    return (
        <ListItemDecorator>
        <Badge badgeContent={props.valor} color={props.tipo == 1 ? "primary" : props.tipo == 0 ? "warning" : "success"} max={9}>
          { props.tipo == 1 ? <PeopleAltIcon /> : props.tipo == 0 ? <PendingActionsIcon /> : <NotificationsActiveIcon />}
        </Badge>
      </ListItemDecorator>
    );
}