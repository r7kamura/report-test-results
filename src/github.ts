import { github } from "./deps.ts";
import { performance } from "node:perf_hooks";

// Workaround for deno compatibility issue on undici:
// deno-lint-ignore no-explicit-any
(globalThis as any).performance = performance;

export async function getCurrentJob({
  githubToken,
  owner,
  repo,
  jobName,
  runId,
}: {
  githubToken: string;
  owner: string;
  repo: string;
  jobName: string;
  runId: number;
}) {
  const res = await github.getOctokit(githubToken).request(
    "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
    {
      owner,
      repo,
      run_id: runId,
    },
  );
  return res.data.jobs.find((job) => job.name === jobName);
}

export async function updateCheckRun({
  githubToken,
  owner,
  repo,
  checkRunId,
  title,
}: {
  githubToken: string;
  owner: string;
  repo: string;
  checkRunId: number;
  title: string;
}) {
  return await github.getOctokit(githubToken).request(
    "PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}",
    {
      owner,
      repo,
      check_run_id: checkRunId,
      output: {
        title,
        summary: "",
      },
    },
  );
}
