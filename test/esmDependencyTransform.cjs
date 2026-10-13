const ts = require('typescript')

/**
 * Compiles ESM-only dependencies (React Router) to CommonJS so Jest can load them.
 * `import.meta` is only used on server code paths, so it is replaced by an empty object.
 */
module.exports = {
  process(source, filename) {
    const { outputText, sourceMapText } = ts.transpileModule(
      source.replace(/\bimport\.meta\b/g, '({})'),
      {
        fileName: filename,
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          allowJs: true,
          esModuleInterop: true,
          sourceMap: true,
        },
      },
    )

    return { code: outputText, map: sourceMapText }
  },
}
