import { AutomationAction } from '../types/api.types';

export const mockAutomations: AutomationAction[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject', 'body']
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient']
  },
  {
    id: 'notify_slack',
    label: 'Notify Slack Channel',
    params: ['channel', 'message']
  },
  {
    id: 'create_ticket',
    label: 'Create JIRA Ticket',
    params: ['project', 'summary', 'assignee']
  }
];
