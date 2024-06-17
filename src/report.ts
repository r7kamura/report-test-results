import { junit2json } from "./deps.ts";

export async function inspectTestReport(paths: string[]) {
  const reports = await Promise.all(
    paths.map(async (path) => {
      return await parseTestReport(path);
    }),
  );

  return reports.reduce(
    (accumulator, report) => {
      return {
        errorsCount: accumulator.errorsCount + report.errorsCount,
        failuresCount: accumulator.failuresCount + report.failuresCount,
        passesCount: accumulator.passesCount + report.passesCount,
      };
    },
    {
      errorsCount: 0,
      failuresCount: 0,
      passesCount: 0,
    },
  );
}

async function parseTestReport(path: string) {
  const content = Deno.readTextFileSync(path);

  const result = await junit2json.parse(content);
  if (result === null || result === undefined || result.tests === undefined) {
    throw new Error("Could not find testsuites.");
  }

  const errorsCount = result.errors || 0;
  const failuresCount = result.failures || 0;
  const testsCount = result.tests || 0;
  const passesCount = testsCount - errorsCount - failuresCount;

  return {
    errorsCount,
    failuresCount,
    passesCount,
  };
}
