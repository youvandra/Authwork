import { z } from "zod";
import { router, artistProcedure, publicProcedure } from "../trpc";

const upsert = artistProcedure
  .input(
    z.object({
      description: z.string(),
      facebook: z.string().nullable(),
      twitter: z.string().nullable(),
      instagram: z.string().nullable(),
      followers: z.number(),
      awards: z.array(z.string()),
      tokenIds: z.array(z.number()),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { description, facebook, instagram, twitter, followers } = input;
    const awards = input.awards.map((a) => ({ name: a }));
    const tokenIds = input.tokenIds.map((id) => ({ id }));
    return ctx.prisma.artistProfile.upsert({
      create: {
        id: ctx.session.user.id,
        description,
        followers,
        awards: { createMany: { data: awards } },
        facebook,
        instagram,
        tokenIds: { createMany: { data: tokenIds } },
        twitter,
      },
      update: {
        description,
        followers,
        awards: { createMany: { data: awards } },
        facebook,
        instagram,
        tokenIds: { createMany: { data: tokenIds } },
        twitter,
      },
      where: {
        id: ctx.session.user.id,
      },
    });
  });

const getById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const profile = await ctx.prisma.artistProfile.findFirst({
      where: { id: input.id },
      include: {
        user: { select: { name: true, image: true } },
        awards: { select: { name: true } },
        tokenIds: { select: { id: true } },
      },
    });

    return profile;
  });

const getArtists = publicProcedure.query(async ({ ctx, input }) => {
  const artists = await ctx.prisma.artistProfile.findMany({
    include: {
      user: { select: { name: true, image: true } },
      awards: { select: { name: true } },
      tokenIds: { select: { id: true } },
    },
  });
  return artists;
});

export const artistRouter = router({
  upsert,
  getById,
  getArtists,
});
