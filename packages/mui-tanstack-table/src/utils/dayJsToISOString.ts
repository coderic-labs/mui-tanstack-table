import { Dayjs } from 'dayjs';

export const dayJsToISOString = (value: Dayjs | null) =>
	value?.isValid() ? value.toISOString() : undefined;
