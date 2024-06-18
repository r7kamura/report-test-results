# report-test-results

Custom action to report test results.

## Usage

This action reads the test results written in JUnit XML format and reflects them in GitHub Checks. So use this action after generating test results:

```yaml
- uses: r7kamura/report-test-results@v0
  if: success() || failure()
  with:
    path: test-results/*.xml
```

This way, the test results will be displayed in the pull request checks UI:

![](./images/screenshot.png)

## Inputs

### `path`

Glob pattern to search for the test results.

- required
- e.g. `test-results/*.xml`
