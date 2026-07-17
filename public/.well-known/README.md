# apple-app-site-association (AASA)

Served verbatim at `https://helloparade.app/.well-known/apple-app-site-association`
(Vite copies everything in `public/` to the dist root, including this dotfolder).
The file must have NO extension and should be served as JSON.

## Path sequencing — read before adding paths

The `components` list only covers paths the CURRENTLY SHIPPED iOS build can
actually handle (`/invite/*`, `/share/*`, `/imessage-plan`, `/imsg`,
`/imsg-connect`).

Do NOT add `/invite.html`, `/plan-invite/*`, or `/trip-invite/*` yet: the
current app build has no deep-link handlers for those routes, so a universal
link would open the app and dead-end. Add them here only AFTER the next app
build (the one that ships the invite.html / plan-invite / trip-invite
handlers) is live on the App Store.

Note: Apple's CDN caches this file (typically up to ~24h, and only refetches
on app install/update), so changes propagate slowly.
