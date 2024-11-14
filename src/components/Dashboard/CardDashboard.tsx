import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import TaskIcon from "@mui/icons-material/Task";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import Hourglass from "@mui/icons-material/HourglassEmpty";
import Equalizer from "@mui/icons-material/Equalizer";

export interface Props {
  value: string;
  etapa: string;
  icone: string;
  cor?: string; 
}

const iconMap: Record<string, React.ElementType> = {
  DoneIcon,
  TaskIcon,
  PersonIcon,
  AssignmentIcon,
  FolderIcon,
  HourglassDisabledIcon,
  Hourglass,
  Equalizer

};

function IconAvatar({ iconName, iconColor }: { iconName: string; iconColor?: string }) {
  const IconComponent = iconMap[iconName] || DoneIcon;
  return (
    <Avatar style={{ backgroundColor: iconColor || "default" }}> {/* Cor de fundo opcional */}
      <IconComponent />
    </Avatar>
  );
}

export default function CardDashboard({ 
  etapa, 
  value,
  icone,
  cor
}: Props): React.JSX.Element {
  return (
    <Card sx={{borderRadius: 4, boxShadow:'0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {etapa}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <IconAvatar iconName={icone} iconColor={cor} /> {/* Passando a cor de fundo */}
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <Stack
              sx={{ alignItems: "center" }}
              direction="row"
              spacing={0.5}
            ></Stack>            
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
