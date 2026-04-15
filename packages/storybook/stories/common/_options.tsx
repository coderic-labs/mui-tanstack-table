import { allEmploymentTypes, allTechs } from "./_data";

export const employmentOptions = allEmploymentTypes.map(employmentType => ({ value: employmentType, label: 'label_' + employmentType }));
export const techOptions = allTechs.map(tech => ({ value: tech, label: 'label_' + tech }));
export const verifiedLabels = { checked: 'yes', unchecked: 'no', undetermined: 'all' };