# دکّان بهجت

Run with Node.js 22.13+:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173/account.html (shop: /shop.html, landing: /).
The previous static Python server cannot serve account APIs. Use the Node server.

## Accounts

Registration uses a nickname, username, Iranian mobile number and password, plus a customizable avatar. Login uses username/password. Phone numbers are not SMS-verified. Passwords use salted scrypt; sessions use opaque random tokens, stored as hashes, with HttpOnly SameSite cookies. HTTPS adds Secure and the __Host- cookie prefix. Mutations require same-origin JSON. Login, signup and password-change attempts are rate limited. Password changes invalidate existing sessions. Profile updates derive ownership exclusively from the server session.

The local SQLite database is `.data/behjat.sqlite`; this private directory is ignored by Git and is never served. Preserve it when restarting. Back up this directory securely for local persistence. Tests use a separate in-memory database and synthetic data.

Cart and favorites remain device-local. The catalogue contains 16 real retail products from the owner's 13 supplied posters, including separate notebook sizes and highlighter designs. Initial prices are editable estimates authorized by the owner; each item starts with a conservative stock of 100. Wholesale minimums printed on the posters do not apply. See PRICING.md. Checkout requires authentication but does not place an order because no payment provider is configured. Recovery and SMS verification are not implemented.

## Products and administration

Product details are available at `/product.html?id=admiral-12-metal`. `/admin.html` provides product creation and editing, image uploads, specifications, price and stock, draft/publish/archive controls, category management, site copy and appearance settings, customer blocking, and an audit log. All admin APIs enforce the role on the server. Concurrent edits are protected with version checks. Uploaded images are validated and stored in the database.

To reserve the owner's selected administrator account, run `node server/create-admin.mjs admin-behjat`. This writes a private, single-use setup URL to `.data/admin-setup-link.txt`, valid for 24 hours. Open that URL locally and let the owner choose their password and phone number. The command can renew an unused invitation but refuses to modify an activated account. Never publish the setup URL or `.data` directory. Normal sign-in then uses username and password.

## Validation

`npm test` checks account lifecycle, ownership, CSRF, password storage, session invalidation, rate limiting, admin authorization, catalogue changes, uploads, settings, stock and cart behavior. `npm run build` produces a Worker entry point under `dist/server` and assets under `dist/client`. Browser fixtures use a separate `.data/browser.test.sqlite` database; never use that fixture as the live database.

## Hosting

This is now a server-backed application; do not publish the `dist` source directory as a static site. The Worker adapter needs a D1 binding named `DB`, an `ASSETS` binding for `dist/client`, the `nodejs_compat` compatibility flag, and the generated migrations in `drizzle/`. These runtime bindings must be configured with the hosting provider before deployment. `.openai/hosting.json` preserves the existing Site ID. Hosting was not completed because the installed Sites workflow files became unavailable during this task; no new online version was published.
