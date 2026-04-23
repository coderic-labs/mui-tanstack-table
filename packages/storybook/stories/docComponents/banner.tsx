import ExtensionIcon from '@mui/icons-material/Extension';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Box, Grid2, Paper, Typography } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const keyPoints = [
    {
        icon: <LayersIcon color="primary" fontSize="large" />,
        title: "Separation of UI & Logic",
        description: "Strict separation—TanStack handles logic, MUI renders UI. No hidden behavior."
    },
    {
        icon: <AutoAwesomeIcon color="secondary" fontSize="large" />,
        title: "Advanced Features",
        description: "Pinning, column order, filtering, sorting, expansion, selection, and more."
    },
    {
        icon: <IntegrationInstructionsIcon color="action" fontSize="large" />,
        title: "TanStack & MUI",
        description: "Built for TanStack Table v8 and Material UI v6+. Modern, robust, and compatible."
    },
    {
        icon: <ExtensionIcon color="info" fontSize="large" />,
        title: "Maximum Flexibility",
        description: "Composable, explicit, and transparent. Full control for advanced use cases."
    },
    {
        icon: <TuneIcon color="success" fontSize="large" />,
        title: "Customization",
        description: "Override styles, swap components, and adapt to any app’s needs."
    },
    {
        icon: <WidgetsIcon color="warning" fontSize="large" />,
        title: "Rich Docs & Demos",
        description: "Comprehensive documentation and live Storybook demos for every feature."
    }
];

export const Banner = () => (
    <Box sx={{ py: 4 }}>
        <Grid2 container spacing={3} justifyContent="center">
            {keyPoints.map((point, idx) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <Box sx={{ mb: 2 }}>{point.icon}</Box>
                        <Typography variant="h6" gutterBottom>{point.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{point.description}</Typography>
                    </Paper>
                </Grid2>
            ))}
        </Grid2>
    </Box>
);
