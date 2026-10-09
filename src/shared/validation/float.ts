import { z } from 'zod';

export const floatSchema = z.number().refine(
    (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
    { message: 'Must have exactly 2 decimal places' }
);
