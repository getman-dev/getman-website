export type ExampleFormat = 'JSON' | 'YAML';
export type ExampleComplexity = 'Simple' | 'Medium' | 'Complex';

export interface ExampleSpec {
  name: string;
  description: string;
  url: string;
  format: ExampleFormat;
  complexity: ExampleComplexity;
}

export const examples: ExampleSpec[] = [
  {
    name: 'Petstore 3.0',
    description: 'The classic OpenAPI sample — CRUD for a pet store',
    url: 'https://petstore3.swagger.io/api/v3/openapi.json',
    format: 'JSON',
    complexity: 'Simple',
  },
  {
    name: 'Petstore YAML',
    description: 'Same Petstore spec in YAML format',
    url: 'https://petstore3.swagger.io/api/v3/openapi.yaml',
    format: 'YAML',
    complexity: 'Simple',
  },
  {
    name: 'GitHub REST API',
    description: "GitHub's full public REST API (large spec)",
    url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json',
    format: 'JSON',
    complexity: 'Complex',
  },
  {
    name: 'Stripe API',
    description: "Stripe's payments API",
    url: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml',
    format: 'YAML',
    complexity: 'Complex',
  },
  {
    name: 'JSON Placeholder',
    description: 'Simple REST API for prototyping',
    url: '/samples/json-placeholder.json',
    format: 'JSON',
    complexity: 'Simple',
  },
  {
    name: 'OpenAI API',
    description: "OpenAI's public API spec",
    url: 'https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml',
    format: 'YAML',
    complexity: 'Medium',
  },
];