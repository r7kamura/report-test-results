import { github } from "./deps.ts";
import { getCurrentJob, updateCheckRun } from "./github.ts";
import { glob } from "./file.ts";
import { collectTestReport } from "./junit.ts";

const githubToken = Deno.env.get("GITHUB_TOKEN")!;
const globPattern = Deno.env.get("REPORT_TEST_RESULTS_INPUTS_PATH");

if (!globPattern) {
  throw new Error("Specify `path`.");
}

const report = await collectTestReport(
  glob(globPattern),
);

const job = await getCurrentJob({
  githubToken,
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  jobName: github.context.job,
  runId: github.context.runId,
});

if (!job) {
  throw new Error("Could not find current running job ID.");
}

updateCheckRun({
  githubToken,
  owner: github.context.repo.owner,
  repo: github.context.repo.repo,
  checkRunId: job.id,
  title:
    `${report.failuresCount} failures, ${report.errorsCount} errors, ${report.passesCount} passes.`,
});
