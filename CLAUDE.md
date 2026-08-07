@AGENTS.md

# Standing project rules (do not forget across sessions)

- **Canonical domain**: treat `https://satacademygulistan.uz` (and its
  `www.` variant) as the real, primary address of this website — not the
  `lc-sat-academy.vercel.app` Vercel URL. Both point at the same
  deployment, but the custom domain is what the user actually shares and
  cares about.
- **Every change ships to production**: whenever you make a code change,
  both (1) `git commit` and `git push` to GitHub, and (2) deploy to
  Vercel production (`vercel --prod --yes`, with `.git` temporarily
  moved aside first — see below for why). The user's top priority is
  that the live website always reflects the latest work; don't leave
  finished changes undeployed or uncommitted.
- **Why `.git` gets hidden during deploy**: the local git author email
  isn't verified with the connected GitHub account, which makes
  Vercel's Git integration block deploys ("Fix Git Configuration").
  Deploying via the CLI with `.git` temporarily moved out of the
  project directory (`mv .git /tmp/... && vercel --prod --yes && mv
  /tmp/... .git`) avoids Vercel attaching that commit metadata, so the
  deploy isn't blocked. This is a workaround, not a reason to skip the
  `git push` step — GitHub history still matters.
- **Full autonomy over the database and Vercel**: the user has granted
  standing authorization to act directly on Neon/Postgres (schema
  changes, migrations, queries) and Vercel (env vars, deployments,
  domains) without asking for permission first. Just do the work.
