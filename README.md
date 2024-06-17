# report-test-results

Custom action to report test results.

This action reads the test results written in JUnit XML format and reflects them in GitHub Checks. This makes it easy to view test results from pull request pages, etc.

## Inputs

### `path`

Glob pattern to search for the test results.

- required
- e.g. `test-results/**/*.xml`
