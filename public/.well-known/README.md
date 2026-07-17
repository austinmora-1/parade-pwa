# apple-app-site-association (AASA)

Served verbatim at `https://helloparade.app/.well-known/apple-app-site-association`
(Vite copies everything in `public/` to the dist root, including this dotfolder).
The file must have NO extension and should be served as JSON.

## Path sequencing — read before adding paths

The `components` list must only cover paths the SHIPPED iOS build can
actually handle. `/invite.html`, `/plan-invite/*`, and `/trip-invite/*` were
added 2026-07-17 together with build #25, which ships the +native-intent
rewrite and the plan/trip invite claim screens. Users on builds ≤ #24 who
tap an invite link will open the app to an unmatched-route screen until they
update — acceptable for the TestFlight audience; keep this in mind before
any future path additions.

Note: Apple's CDN caches this file (typically up to ~24h, and only refetches
on app install/update), so changes propagate slowly.
