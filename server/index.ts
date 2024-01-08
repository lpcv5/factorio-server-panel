import parse from "node-html-parser";
import { publicProcedure, router } from "./trpc";
import { Config, JsonDB } from "node-json-db";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const url = "https://www.factorio.com/download/archive/";
    const response = await fetch(url);
    const body = await response.text();
    const root = parse(body);
    const db = new JsonDB(new Config("myDataBase", true, false, "/"));
    let html_a = root.querySelectorAll(".slot-button-inline");
    let result = html_a.map((item, index) => {
      return {
        id: index,
        label: item.textContent.trim(),
        value: item.getAttribute("href") || "",
      };
    });
    return result;
  }),
});
export type AppRouter = typeof appRouter;
