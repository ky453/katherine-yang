# Ask Katherine

The portfolio includes an English question-and-answer panel on every page. Its
knowledge is curated from Katherine's supplied résumé, supplemental project
descriptions, and existing case studies. The raw Chinese coaching document is
not included in the app, public assets, or model prompt.

## Available now: portfolio notes

Run `npm run dev` and open **Ask Katherine** in the bottom-right corner. Without
`VITE_ASK_KATHERINE_URL`, the panel retrieves prepared English notes in the
browser. It explicitly identifies these as prepared answers, not live AI.
This works on GitHub Pages with no backend or API credits. Unmatched questions
receive a clear explanation instead of an invented answer.

The new résumé is available at `public/assets/Katherine_Yang_PM_Resume.pdf`.
`predev` and `prebuild` generate a readable `assets/katherine-project-notes.txt`
from the same knowledge used by the assistant, so supplemental details have a
public source link. The generated text file is ignored by Git.

## Enable live OpenAI answers

The React site stays on GitHub Pages. A separate Cloudflare Worker handles
`POST /api/ask`, keeps credentials server-side, and calls the OpenAI Responses
API with structured output. No database, vector store, agent SDK, or account for
visitors is needed.

1. Install the locked dependencies with `npm ci`.
2. Authenticate Cloudflare: `npx wrangler login`.
3. Check `worker/wrangler.jsonc`. Set `ALLOWED_ORIGINS` to the portfolio's exact
   origin (for example, `https://ky453.github.io`, without the repository path).
   Remove localhost origins before a production-only deployment. Keep the two
   rate-limit namespace IDs unique within your Cloudflare account.
4. Select an available Responses-compatible model supporting structured output
   and low reasoning effort in `OPENAI_MODEL`. The default is `gpt-5.6-terra`;
   model access depends on your OpenAI project.
5. Run `npx wrangler secret put OPENAI_API_KEY --config worker/wrangler.jsonc`
   and enter the project key at the secure prompt. Never put the key into a
   `VITE_` variable or commit it.
6. Run `npm run assistant:check`, then `npm run assistant:deploy`.
7. Copy the returned Worker URL and append `/api/ask`.
8. In the GitHub repository, create an Actions **repository variable** named
   `VITE_ASK_KATHERINE_URL` with that full endpoint URL. The existing Pages
   build reads the variable. Rebuild/deploy the frontend to enable the AI mode.

The UI labels AI answers separately from notes. If a request fails, visitors can
retry or explicitly switch to prepared notes; errors do not silently masquerade
as model answers. Conversations stay in component memory and are cleared by a
page reload or **Start a new conversation**. The Worker sends up to eight prior
messages to OpenAI for follow-ups, uses `store: false`, and does not add its own
chat database or question logging. OpenAI's API data policies still apply.

## Local AI development

Copy `worker/.dev.vars.example` to `worker/.dev.vars`, replace the placeholder
with your key, and run `npm run assistant:dev`. In a separate terminal, copy
`.env.example` to `.env.local`, set:

```dotenv
VITE_ASK_KATHERINE_URL=http://localhost:8787/api/ask
```

Restart `npm run dev`. The local portfolio origin must be in `ALLOWED_ORIGINS`.
Local AI requests spend API credits. Local Wrangler behavior is not a substitute
for verifying production rate limits.

## Content and limits

- Edit `content/katherineKnowledge.js` to update public facts, matching keywords,
  source links, or suggested questions. Both the frontend and Worker import it.
  Rebuild the site and redeploy the Worker after changes.
- Supplemental notes support PantryPilot and the expanded payment/storage
  stories. The new résumé additionally supports the INFO 5940 multi-agent/RAG
  project. Interview-answer coaching and speculative growth explanations are
  excluded as factual evidence.
- CloudSky's +66% / +49% / +40% figures describe product-wide growth during the
  internship, without asserting that Katherine caused it. Design concepts,
  future metrics, and proposed safety measures remain labeled accordingly.
- The model receives the complete small knowledge base. Prompt instructions
  require English, third-person answers, uncertainty when facts are absent, and
  no invented achievements. These instructions reduce errors but cannot
  guarantee factual accuracy; review representative real answers before launch.
- Sources are restricted to an allowlist. Model-generated text is rendered as
  plain React text, never HTML or arbitrary Markdown links.
- The endpoint validates JSON, body size, history roles, question length, and
  response shape. It has a 25-second upstream timeout and a bounded output.
- Cloudflare bindings allow approximately six requests per visitor per minute
  and thirty per minute for the site **per Cloudflare location**. These are abuse
  controls, not a strict global or monetary cap. CORS is also not authentication:
  non-browser clients can forge origins. Configure OpenAI project limits/model
  permissions and monitor spending before public launch. Use a Durable Object
  if a strict cross-location request budget is required.
- Missing keys, model configuration, or rate-limit bindings return 503 and never
  call the model. Provider diagnostics and credentials are not returned to users.

## Verification

```sh
npm test
npm run lint
npm run build
npm run assistant:check
```

Automated tests cover note selection, attribution, unknown details, source
allowlists, request validation, CORS, throttling, provider failures, and the
deployed Worker adapter using a mocked model. They do not measure real model
answer quality. Manually check mobile layout, Escape/focus behavior, keyboard
submission, sources, errors, and several multi-turn conversations before launch.

The implementation was also started in the local Workers runtime: an allowed
preflight returned 204, a blocked origin returned 403, and a request without an
API key returned 503 without contacting OpenAI. Real model responses and visual
browser behavior remain unverified without credentials and a working browser
connection. Compatible dependency patches were applied; npm still reports four
moderate advisories in the existing ESLint/minimatch development-tool chain.

Implementation references:
[OpenAI Responses structured output](https://developers.openai.com/api/docs/guides/structured-outputs),
[configured model](https://developers.openai.com/api/docs/models/gpt-5.6-terra),
and [Cloudflare rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
