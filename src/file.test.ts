import { asserts } from "./deps.ts";
import { glob } from "./file.ts";

Deno.test("glob", () => {
  const files = glob("src/file.ts");
  asserts.assertEquals(
    files,
    ["src/file.ts"],
  );
});
