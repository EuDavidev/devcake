# DevCake Full Stack Portfolio Design

Date: 2026-03-29
Owner: DevCake Project
Status: Draft for user review

## 1. Objective
Transform the current DevCake project into a portfolio-ready full stack product to support junior front-end, back-end, or full stack job applications.

Primary goals:
- Deliver a 100% functional end-to-end order flow.
- Keep strong visual quality and UX polish to stand out in selection processes.
- Demonstrate practical engineering maturity: API design, data persistence, authentication, testing, and deployment.

Chosen strategy:
- Approach B (balanced): professional scope, strong impact, realistic execution.
- Product shape: full stack order management system.
- Backend stack: Next.js API Routes + MongoDB.
- Auth scope: admin login only (public customer ordering).

## 2. Scope Definition
### In scope
- Public storefront with catalog, filters, cart, and order form.
- Real order creation API with server-side validation and persistence.
- Admin authentication and protected routes.
- Admin dashboard for viewing/filtering/updating orders.
- Production deployment with environment documentation.
- Portfolio-oriented README and technical narrative.

### Out of scope (this phase)
- Customer account login.
- Online payment gateway.
- Multi-tenant marketplace.
- Advanced analytics and BI dashboards.

## 3. High-Level Architecture
### Frontend
- Next.js App Router.
- Public routes for catalog and ordering.
- Admin area under protected routes.
- Existing UI language is preserved and polished for consistency and conversion.

### Backend
- Next.js API Routes (same repository).
- REST-style endpoints for auth and order operations.
- Zod validation at API boundaries.

### Data Layer
- MongoDB Atlas for persistence.
- Shared DB connection utility with pooling/caching strategy for serverless execution.

### Authentication
- Admin-only login.
- Session token via HttpOnly cookie.
- Middleware route protection for admin pages and admin APIs.

## 4. Data Model
### admins collection
Fields:
- name
- email (unique)
- passwordHash
- role (admin)
- createdAt
- updatedAt

Rules:
- Passwords are never stored in plaintext.
- Hashing via bcrypt.

### products collection
Fields:
- name
- slug (unique)
- category
- price
- description
- imageUrl
- isActive
- createdAt
- updatedAt

Rules:
- Inactive products are hidden from public storefront.

### orders collection
Fields:
- customerName
- customerEmail
- customerPhone (optional)
- items: array of
  - productId
  - nameSnapshot
  - unitPriceSnapshot
  - quantity
  - subtotal
- total
- notes
- status (pending, confirmed, preparing, delivered, canceled)
- createdAt
- updatedAt

Rules:
- Server computes total and subtotals.
- Order stores product snapshot for historical integrity.

## 5. Core Flows
### Customer flow
1. Browse products by category.
2. Add items to cart and review details.
3. Submit order form.
4. Frontend calls POST /api/orders.
5. User receives success state with order reference.
6. Optional CTA to open WhatsApp with order summary.

### Admin flow
1. Open /admin/login.
2. Authenticate with email/password.
3. Receive secure session cookie.
4. Open /admin/pedidos.
5. Filter/search orders.
6. Update order status with immediate visual feedback.

### Permissions
Public:
- storefront and create order endpoint.

Protected:
- list orders.
- update status.
- logout/admin actions.

## 6. API Design
### Public endpoints
- POST /api/orders
  - Validates payload.
  - Validates product activity and pricing rules.
  - Persists order.
  - Returns order id and metadata.

### Admin auth endpoints
- POST /api/admin/login
- POST /api/admin/logout
- GET /api/admin/me (optional convenience endpoint)

### Admin order endpoints
- GET /api/admin/orders?status=&q=
- PATCH /api/admin/orders/:id/status

## 7. UX/UI Guidelines
### Public storefront UX
- Clear value proposition in hero.
- Strong and consistent CTAs.
- Order flow with clear states: loading, error, success.
- Mobile-first behavior without layout breakage.

### Admin UX
- Clean table/list with status, customer, date, total, actions.
- Fast status updates with visible feedback.
- Empty/error states that are explicit and actionable.

### Accessibility
- Keyboard navigable interactions.
- Semantic labels and aria attributes in critical actions.
- Adequate color contrast and visible focus states.
- Reduced motion support where relevant.

## 8. Quality and Testing
### Code quality baseline
- Configure ESLint and formatting standards.
- Remove dead/legacy parallel implementation folders not used by active app route tree.

### Testing baseline
- API tests:
  - order creation success/failure cases.
  - admin status update with/without auth.
- UI tests:
  - order form validation and submit states.
- E2E critical path:
  - create order -> admin sees order -> admin updates status.

## 9. Security and Reliability
- Password hashing with bcrypt.
- HttpOnly cookies for admin sessions.
- Input validation on server for all write endpoints.
- Basic rate limiting on login endpoint.
- Clear error responses without sensitive leakage.

## 10. Deployment
- Vercel for app and API hosting.
- MongoDB Atlas for database.
- Environment variables documented in README.
- Optional seed script for demo-ready data.

## 11. Portfolio Narrative Strategy
README and interview storytelling must cover:
- Problem statement.
- Why architecture was chosen.
- Trade-offs made (scope, auth model, stack decisions).
- What is production-ready and what is intentionally deferred.
- How UX choices improve conversion and usability.

## 12. Definition of Done
Project is considered portfolio-ready when:
- End-to-end order flow works in production environment.
- Admin authentication and order management are functional.
- No misleading README claims.
- Core tests pass and linting is configured.
- UX is consistent across desktop and mobile.
- Public demo and repository setup instructions are complete.

## 13. Risks and Mitigations
- Risk: scope inflation.
  - Mitigation: implement strictly in milestone phases.
- Risk: visual polish delays backend completion.
  - Mitigation: lock critical backend milestones first.
- Risk: fragile auth implementation.
  - Mitigation: keep session model simple and well-tested.

## 14. Milestone Breakdown (Execution Preview)
- Milestone 1: credibility baseline
  - README correction, lint setup, codebase cleanup.
- Milestone 2: backend foundation
  - DB connection, schemas/models, auth endpoints, order create endpoint.
- Milestone 3: admin panel
  - login page, protected route, orders list, status updates.
- Milestone 4: UX/UI polish and accessibility
  - conversion improvements, state handling, responsive and a11y hardening.
- Milestone 5: testing and deployment
  - key tests, production deploy, final portfolio narrative.

## 15. Open Decisions (resolved in this design)
- Product type: full stack order system.
- Backend stack: Next API Routes + MongoDB.
- Authentication: admin-only.
- Strategy: balanced implementation focused on employability impact.
