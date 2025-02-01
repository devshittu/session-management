// prisma/generate-schema.ts

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Define the path to the template and output schema
const templatePath = resolve(__dirname, 'schema.template.prisma');
const outputPath = resolve(__dirname, 'schema.prisma');

// Determine which provider to use from an environment variable.
// For local development, set DATABASE_PROVIDER=sqlite in your .env file.
// For production, set DATABASE_PROVIDER=postgresql (or use your preferred provider).
const provider = process.env.DATABASE_PROVIDER || 'sqlite';

// Read the template schema file.
let schema = readFileSync(templatePath, 'utf-8');

// Replace the placeholder with the actual provider.
schema = schema.replace(/\$PROVIDER\$/g, provider);

// Write out the generated schema.
writeFileSync(outputPath, schema);

console.log(`Generated schema.prisma with provider: ${provider}`);
