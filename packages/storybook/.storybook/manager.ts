import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
    base: 'dark',
    brandTitle: 'MUI TanStack Table',
    brandUrl: 'https://github.com/coderic-labs/mui-tanstack-table',
    colorPrimary: '#1976D2',
    colorSecondary: '#7B3FE4',
    //colorTertiary: '#F57C00',
});

addons.setConfig({
    theme
});
