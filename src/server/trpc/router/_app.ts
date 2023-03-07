// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { artistRouter } from "./artist";
import { eventRouter } from "./event";
import { museumRouter } from "./museum";
import { authRouter } from "./auth";

export const appRouter = router({
  artist: artistRouter,
  event: eventRouter,
  museumRouter: museumRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
