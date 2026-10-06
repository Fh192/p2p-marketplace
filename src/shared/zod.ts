import z from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const slugSchema = z.string().min(1).max(100).regex(slugRegex);
