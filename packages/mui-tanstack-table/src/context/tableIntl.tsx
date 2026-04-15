import React, { useContext, useMemo } from 'react';
import { createIntl } from 'react-intl';
import enMessages from '../localization/en_gb.json';

const fallbackIntl = createIntl({
    locale: 'en',
    messages: enMessages,
});

const TableIntlContext = React.createContext(fallbackIntl);

export type LocalizationProviderProps = {
    locale: string;
    messages: Partial<typeof enMessages>;
    children: React.ReactNode;
}

export const TableLocalizationProvider = (props: LocalizationProviderProps) => {
    const { children, locale, messages } = props;

    const intl = useMemo(() => createIntl({ locale, messages: { ...enMessages, ...messages } }), [locale, messages]);

    return (
        <TableIntlContext.Provider value={intl}>
            {children}
        </TableIntlContext.Provider>
    );
}

export const useTableIntl = () => {
    const intl = useContext(TableIntlContext);
    return intl;
};
