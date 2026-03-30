# DevCake Milestones 1-2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Milestone 1 (credibility baseline) and Milestone 2 (backend foundation) for a portfolio-ready full stack baseline.

**Architecture:** Keep the current Next.js App Router frontend, remove legacy parallel code that is not used by active routes, and add a server-side backend foundation with MongoDB, schemas, validation, and initial API endpoints. Build in vertical slices with test-first steps for core domain logic.

**Tech Stack:** Next.js 15, React 19, Node runtime routes, MongoDB Atlas, Zod, bcryptjs, ESLint (Next config), and lightweight unit tests for domain services.

---

### Task 1: Baseline Tooling and Dependencies

**Files:**

- Modify: `package.json`
- Create: `.eslintrc.json`

- [ ] **Step 1: Install backend and quality dependencies**

```bash
npm install mongodb bcryptjs
npm install -D eslint-config-next
npm install -D vitest
```

- [ ] **Step 2: Add lint scripts to package.json**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:strict": "next lint --max-warnings=0",
    "test:unit": "vitest run"
  }
}
```

- [ ] **Step 3: Create ESLint config**

```json
{
  "extends": ["next/core-web-vitals"]
}
```

- [ ] **Step 4: Verify lint command**

Run: `npm run lint`
Expected: ESLint executes without interactive setup prompt.

- [ ] **Step 5: Commit**

```bash
git add package.json .eslintrc.json
git commit -m "chore: configure eslint baseline for portfolio quality"
```

### Task 2: README Credibility Rewrite

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Replace inaccurate feature claims with current + planned roadmap**

```md
## DevCake

Projeto full stack em evolução para portfólio: vitrine de confeitaria com fluxo real de pedidos.

### Estado atual

- Landing page com catálogo, filtros, carrinho e formulário de contato.
- UI responsiva com componentes reutilizáveis.

### Roadmap ativo (Milestones 1-5)

- M1: Credibilidade (README, lint, limpeza legado)
- M2: Fundação backend (MongoDB + APIs)
- M3: Painel admin autenticado
- M4: UX/UI e acessibilidade avançadas
- M5: Testes e deploy
```

- [ ] **Step 2: Add local setup and env template section**

```md
## Como rodar

1. npm install
2. npm run dev

## Variáveis de ambiente (próxima fase)

- MONGODB_URI=
- ADMIN_SEED_EMAIL=
- ADMIN_SEED_PASSWORD=
```

- [ ] **Step 3: Verify markdown quality**

Run: `npm run lint`
Expected: no regressions from README update.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: rewrite readme with honest scope and roadmap"
```

### Task 3: Remove Legacy Parallel Frontend Implementation

**Files:**

- Delete: `src/app/components/Banner/index.jsx`
- Delete: `src/app/components/Banner/Banner.module.css`
- Delete: `src/app/components/CardsProdutos/index.jsx`
- Delete: `src/app/components/CardsProdutos/CardsProdutos.module.css`
- Delete: `src/app/components/Contato/index.jsx`
- Delete: `src/app/components/Contato/Contato.module.css`
- Delete: `src/app/components/FiltrarProdutos/index.jsx`
- Delete: `src/app/components/FiltrarProdutos/FiltrarProdutos.module.css`
- Delete: `src/app/components/NavBar/index.jsx`
- Delete: `src/app/components/NavBar/NavBar.module.css`
- Delete: `src/app/components/Sobre/index.jsx`
- Delete: `src/app/components/Sobre/Sobre.module.css`
- Delete: `src/app/services/index.js`
- Delete: `src/app/data/database-devcake.js`
- Modify: `src/app/page.module.css` (remove unused legacy styles or keep only styles used by current page)

- [ ] **Step 1: Confirm no active imports from legacy tree**

```bash
rg "src/app/components|app/components|app/services|database-devcake" src
```

Expected: no active imports in current route tree.

- [ ] **Step 2: Delete unused legacy files and folders**

```bash
git rm src/app/components/Banner/index.jsx src/app/components/Banner/Banner.module.css
git rm src/app/components/CardsProdutos/index.jsx src/app/components/CardsProdutos/CardsProdutos.module.css
git rm src/app/components/Contato/index.jsx src/app/components/Contato/Contato.module.css
git rm src/app/components/FiltrarProdutos/index.jsx src/app/components/FiltrarProdutos/FiltrarProdutos.module.css
git rm src/app/components/NavBar/index.jsx src/app/components/NavBar/NavBar.module.css
git rm src/app/components/Sobre/index.jsx src/app/components/Sobre/Sobre.module.css
git rm src/app/services/index.js src/app/data/database-devcake.js
```

- [ ] **Step 2.1: Remove remaining unused legacy CSS in src/app/page.module.css**

```css
/* Keep file empty or remove classes that are no longer referenced by current page tree */
```

- [ ] **Step 3: Build verification after cleanup**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove legacy parallel app implementation"
```

### Task 4: Database Foundation and Environment Contract

**Files:**

- Create: `src/lib/env.js`
- Create: `src/lib/mongodb.js`
- Create: `.env.example`

- [ ] **Step 1: Create environment parser**

```js
// src/lib/env.js
const required = ["MONGODB_URI"];

export function getEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  return {
    mongodbUri: process.env.MONGODB_URI,
    adminSeedEmail: process.env.ADMIN_SEED_EMAIL || "",
    adminSeedPassword: process.env.ADMIN_SEED_PASSWORD || "",
  };
}
```

- [ ] **Step 2: Create cached MongoDB client for serverless usage**

```js
// src/lib/mongodb.js
import { MongoClient } from "mongodb";
import { getEnv } from "@/lib/env";

let client;
let clientPromise;

export async function getDb() {
  if (!clientPromise) {
    const { mongodbUri } = getEnv();
    client = new MongoClient(mongodbUri);
    clientPromise = client.connect();
  }

  const connected = await clientPromise;
  return connected.db();
}
```

- [ ] **Step 3: Add environment template**

```env
MONGODB_URI=
ADMIN_SEED_EMAIL=
ADMIN_SEED_PASSWORD=
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/env.js src/lib/mongodb.js .env.example
git commit -m "feat: add mongodb connection and env contract"
```

### Task 5: Domain Schemas and Order Validation (Test-First)

**Files:**

- Create: `src/lib/domain/order-schema.js`
- Create: `src/lib/domain/order-service.js`
- Create: `src/lib/domain/order-service.test.js`

- [ ] **Step 1: Write failing unit tests for order total and validation**

```js
// src/lib/domain/order-service.test.js
import { describe, it, expect } from "vitest";
import { calculateOrderTotals } from "./order-service";

describe("calculateOrderTotals", () => {
  it("calculates total from items", () => {
    const result = calculateOrderTotals([
      { unitPriceSnapshot: 10, quantity: 2 },
      { unitPriceSnapshot: 5.5, quantity: 1 },
    ]);

    expect(result.total).toBe(25.5);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test:unit`
Expected: FAIL because implementation does not exist yet.

- [ ] **Step 3: Implement schema + domain logic**

```js
// src/lib/domain/order-schema.js
import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  nameSnapshot: z.string().min(1),
  unitPriceSnapshot: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(3),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
});
```

```js
// src/lib/domain/order-service.js
export function calculateOrderTotals(items) {
  const normalizedItems = items.map((item) => ({
    ...item,
    subtotal: Number((item.unitPriceSnapshot * item.quantity).toFixed(2)),
  }));

  const total = Number(
    normalizedItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
  );

  return { items: normalizedItems, total };
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm run test:unit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/domain/order-schema.js src/lib/domain/order-service.js src/lib/domain/order-service.test.js
git commit -m "feat: add order domain schema and total calculation"
```

### Task 6: Create Public Order Endpoint

**Files:**

- Create: `src/app/api/orders/route.js`
- Modify: `src/lib/domain/order-service.js`

- [ ] **Step 1: Add createOrderRecord service function**

```js
// src/lib/domain/order-service.js
import { getDb } from "@/lib/mongodb";

export async function createOrderRecord(input) {
  const db = await getDb();
  const collection = db.collection("orders");
  const now = new Date();

  const order = {
    ...input,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(order);
  return { id: result.insertedId.toString(), ...order };
}
```

- [ ] **Step 2: Implement POST /api/orders route**

```js
// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { createOrderSchema } from "@/lib/domain/order-schema";
import {
  calculateOrderTotals,
  createOrderRecord,
} from "@/lib/domain/order-service";

export async function POST(request) {
  try {
    const payload = await request.json();
    const parsed = createOrderSchema.parse(payload);
    const { items, total } = calculateOrderTotals(parsed.items);

    const created = await createOrderRecord({
      ...parsed,
      items,
      total,
    });

    return NextResponse.json(
      {
        orderId: created.id,
        status: created.status,
        total: created.total,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid order payload", details: String(error) },
      { status: 400 },
    );
  }
}
```

- [ ] **Step 3: Build verification**

Run: `npm run build`
Expected: successful production build.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/orders/route.js src/lib/domain/order-service.js
git commit -m "feat: add public order creation api"
```

### Task 7: Admin Auth Endpoint Foundation

**Files:**

- Create: `src/lib/auth/password.js`
- Create: `src/app/api/admin/login/route.js`

- [ ] **Step 1: Create password compare helper**

```js
// src/lib/auth/password.js
import bcrypt from "bcryptjs";

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
```

- [ ] **Step 2: Implement admin login route**

```js
// src/app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", "devcake-admin", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Unable to login." }, { status: 500 });
  }
}
```

- [ ] **Step 3: Build verification**

Run: `npm run build`
Expected: build succeeds with new admin login endpoint.

- [ ] **Step 4: Commit**

```bash
git add src/lib/auth/password.js src/app/api/admin/login/route.js
git commit -m "feat: add admin login endpoint foundation"
```

### Task 8: Final Milestone Validation (M1 + M2)

**Files:**

- Modify: `README.md` (if any env/setup mismatch remains)

- [ ] **Step 1: Run full validation commands**

Run:

- `npm run lint`
- `npm run test:unit`
- `npm run build`

Expected:

- lint passes,
- domain tests pass,
- build succeeds.

- [ ] **Step 2: Update README checklist for completed M1 and M2 items**

```md
### Milestone status

- [x] M1 Credibility baseline
- [x] M2 Backend foundation
- [ ] M3 Admin panel
- [ ] M4 UX/UI and accessibility hardening
- [ ] M5 Testing + deployment
```

- [ ] **Step 3: Commit final milestone consolidation**

```bash
git add README.md
git commit -m "docs: mark milestones 1 and 2 as complete"
```
