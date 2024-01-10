import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "./trpc";
import { downloadFileWget, getDownUrl, initGame } from "@/utils/utils";

const prisma = new PrismaClient({});

export const appRouter = router({
  getDownlists: publicProcedure.query(async () => {
    let downListResult = Array.from(await getDownUrl()).map((item) => {
      return {
        version: item.textContent.trim(),
        downurl: item.getAttribute("href") || "",
      };
    });

    return downListResult;
  }),

  setGameConfig: publicProcedure
    .input(
      z.object({
        version: z.string(),
        url: z.string(),
      })
    )
    .mutation(async (opts) => {
      let path = "~/factorio/" + opts.input.version.replace(/\./g, "_");
      let url = `https://www.factorio.com/get-download/${opts.input.version}/headless/linux64`;
      // downloadFileWget(url, path);
      initGame(path);

      // let result = {
      //   version: opts.input.version,
      //   save: "",
      //   gamepath: path,
      // };
      // const downListCreate = await prisma.game.create({
      //   data: result,
      // });
      // console.log(downListCreate);
      return {
        // downListCreate,
        res: true,
      };
    }),

  getGameConfig: publicProcedure
    .input(z.object({ version: z.string() }))
    .query(async (opts) => {
      const gameConfig = await prisma.game.findUnique({
        where: {
          version: opts.input.version,
        },
      });
      return gameConfig;
    }),
});
export type AppRouter = typeof appRouter;
