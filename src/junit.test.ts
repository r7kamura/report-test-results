import { asserts } from "./deps.ts";
import { collectTestReport } from "./junit.ts";

Deno.test("collectTestReport", async () => {
  const report = await collectTestReport([
    "./src/fixtures/junit.xml",
  ]);

  asserts.assertEquals(report, {
    errorsCount: 0,
    failuresCount: 0,
    passesCount: 1,
  });
});
