import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc";

const getById = publicProcedure.input(z.object({ id: z.string() })).query(
  async ({ ctx, input }) =>
    await ctx.prisma.event.findFirst({
      where: { id: input.id },
    })
);

const getAll = publicProcedure.query(
  async ({ ctx }) => await ctx.prisma.event.findMany()
);

export const eventRouter = router({ getById, getAll });
