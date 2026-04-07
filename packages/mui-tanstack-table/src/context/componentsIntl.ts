import {useContext} from 'react';
import {createIntl, IntlContext} from 'react-intl';
import enMessages from '../localization/en_gb.json';

const fallbackIntl= createIntl({
	locale: 'en',
	messages: enMessages
});

export const useComponentsIntl = () => {
	const intl= useContext(IntlContext);
	return intl ?? fallbackIntl;
};