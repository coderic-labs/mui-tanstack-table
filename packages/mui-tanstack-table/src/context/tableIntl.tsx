import React, { useContext, useMemo } from 'react';
import { createIntl } from 'react-intl';
import enMessages from '../localization/en_gb.json';

const fallbackIntl = createIntl({
    locale: 'en',
    messages: enMessages,
});

const TableIntlContext = React.createContext(fallbackIntl);

export type LocalizationProviderProps = {
    /** BCP 47 locale string (e.g. `"en"`, `"de"`, `"fr-CA"`). */
    locale: string;
    /** Partial override map for built-in English message keys. */
    messages: Partial<typeof enMessages>;
    children: React.ReactNode;
}

/**
 * Provides a localized `react-intl` instance to all MTT components in the subtree.
 * Wrap the table region with this provider to override the default English strings.
 */
export const TableLocalizationProvider = (props: LocalizationProviderProps) => {
    const { children, locale, messages } = props;

    const intl = useMemo(() => createIntl({ locale, messages: { ...enMessages, ...messages } }), [locale, messages]);

    return (
        <TableIntlContext.Provider value={intl}>
            {children}
        </TableIntlContext.Provider>
    );
}

/** Returns the nearest `react-intl` instance provided by {@link TableLocalizationProvider}, falling back to English. */
export const useTableIntl = () => {
    const intl = useContext(TableIntlContext);
    return intl;
};
