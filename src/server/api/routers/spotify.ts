import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

export const spotifyRouter = createTRPCRouter({
  login: publicProcedure,
});
