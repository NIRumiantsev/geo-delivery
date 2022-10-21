import { AutoDto } from './AutoDto';

export type AutoCreateDto = Omit<AutoDto, '_id'>;