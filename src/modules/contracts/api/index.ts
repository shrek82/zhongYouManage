import { fetcher } from '../../../core/api';
import { Contract } from '../../../core/types';

// Example of a module-specific API call
export const getContracts = async (): Promise<Contract[]> => {
  // return fetcher('/contracts');
  
  // Returning mock data for now
  return [];
};
