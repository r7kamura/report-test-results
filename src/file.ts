import { fs, path } from "./deps.ts";

export function glob(
  globPattern: string,
) {
  return Array.from(
    fs.walkSync(".", {
      includeDirs: false,
      match: [
        path.globToRegExp(
          globPattern,
          {
            extended: true,
            globstar: true,
          },
        ),
      ],
    }),
  ).map((entry) => entry.path);
}
