import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc";

const getById = publicProcedure.input(z.object({ id: z.string() })).query(
  async ({ ctx, input }) =>
    await ctx.prisma.museum.findFirst({
      where: { id: input.id },
      include: { tokenIds: true },
    })
);

const getAll = publicProcedure.query(
  async ({ ctx }) =>
    await ctx.prisma.museum.findMany({ include: { tokenIds: true } })
);

export const museumRouter = router({ getById, getAll });
