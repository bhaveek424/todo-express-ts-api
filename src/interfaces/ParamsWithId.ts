import * as z from 'zod';

export const ParamsWithId = z.object({
  // Validate objectId
  id: z.string().min(1),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
