module.exports = {
  input: 'src/schema', // "input" of aspida is "output" for openapi2aspida
  outputEachDir: true, // Generate $api.ts in each endpoint directory
  openapi: { inputFile: 'http://localhost:8082/openapi.app.yaml' },
}
