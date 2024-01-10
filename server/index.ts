import parse from "node-html-parser";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "./trpc";
import path from "path";
import { mkdir } from "fs";
import { Readable, finished } from "stream";

const prisma = new PrismaClient({});

const getDownUrl = async () => {
  const url = "https://www.factorio.com/download/archive/";
  const response = await fetch(url);
  const body = await response.text();
  const root = parse(body);
  let htmlDownlistElement = root.querySelectorAll(".slot-button-inline");
  return htmlDownlistElement;
};


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
      let url = opts.input.url;

      let result = {
        version: opts.input.version,
        save: "",
        gamepath: path,
      };
      const downListCreate = await prisma.game.create({
        data: result,
      });
      console.log(downListCreate);
      return {
        downListCreate,
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
