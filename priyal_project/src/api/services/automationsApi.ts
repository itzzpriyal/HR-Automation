import { AutomationAction } from '../types/api.types';

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
  const response = await fetch('/api/automations');
  if (!response.ok) throw new Error('Failed to fetch automations');
  return response.json();
};
