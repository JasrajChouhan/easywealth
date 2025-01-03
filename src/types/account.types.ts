import { AccountSchema } from '@/schemas/account.schema';
import { z } from 'zod';

export type AccountSchemaType = z.infer<typeof AccountSchema>;
