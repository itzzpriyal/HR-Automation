import { z } from 'zod';

export const KeyValueSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string(),
});

export const BaseNodeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const StartNodeSchema = BaseNodeSchema.extend({
  metadata: z.array(KeyValueSchema),
});

export const TaskNodeSchema = BaseNodeSchema.extend({
  description: z.string(),
  assignee: z.string().email('Invalid email').or(z.literal('')),
  dueDate: z.string(),
  customFields: z.array(KeyValueSchema),
});

export const ApprovalNodeSchema = BaseNodeSchema.extend({
  approverRole: z.enum(['Manager', 'HRBP', 'Director', 'CEO']),
  autoApproveThreshold: z.number().min(1).max(30),
});

export const AutomatedStepSchema = BaseNodeSchema.extend({
  actionId: z.string().min(1, 'Action is required'),
  parameters: z.record(z.string()),
});

export const EndNodeSchema = z.object({
  endMessage: z.string(),
  generateSummary: z.boolean(),
});

export type StartNodeFormValues = z.infer<typeof StartNodeSchema>;
export type TaskNodeFormValues = z.infer<typeof TaskNodeSchema>;
export type ApprovalNodeFormValues = z.infer<typeof ApprovalNodeSchema>;
export type AutomatedStepFormValues = z.infer<typeof AutomatedStepSchema>;
export type EndNodeFormValues = z.infer<typeof EndNodeSchema>;
