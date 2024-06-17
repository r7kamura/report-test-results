# report-test-results

Custom action to report test results.

This action reads the test results written in JUnit XML format and reflects them in GitHub Checks. This makes it easy to view test results from pull request pages, etc.

## Usage

Use this action after generating test results as follows:

```yaml
- uses: r7kamura/report-test-results@v0
  with:
    path: ./test-results/*.xml
```

This way, the test results will be displayed in the Pull Request Checks UI:

![](./images/screenshot.png)

## Inputs

### `path`

Glob pattern to search for the test results.

- required
- e.g. `test-results/**/*.xml`
