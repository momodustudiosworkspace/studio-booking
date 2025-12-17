# AI Coding Guidelines for Studio Booking App

## Architecture Overview
This is a full-stack MERN application with separate client (Next.js App Router) and server (Express.js) directories. Client handles UI and state management via Redux Toolkit, server provides REST APIs with MongoDB. Key components:
- **Client**: Pages in `src/app/`, components in `src/components/`, Redux slices in `src/redux/slices/`, RTK Query APIs in `src/redux/services/`
- **Server**: Routes in `src/routes/`, controllers in `src/controllers/`, models in `src/models/`, services in `src/services/`
- Data flow: Client dispatches actions to Redux, uses RTK Query for API calls to server endpoints (e.g., `/api/admin/bookings`, `/api/user/booking`)

## Developer Workflows
- **Development**: Run `npm run dev` in both `client/` (uses Turbopack) and `server/` (uses nodemon + ts-node)
- **Build**: `npm run build` in client (Turbopack), `npm run build` in server (TypeScript compilation)
- **Linting**: `npm run lint` in client (ESLint), no server linting configured
- **Type Checking**: `npm run type-check` in client (TSC), manual in server
- **Pre-commit**: Client has `pre-commit` script running type-check, lint, format-check

## Conventions and Patterns
- **File Naming**: Controllers end with `.controllers.ts`, routes with `.routes.ts`, models with `.models.ts`. Components use PascalCase, pages use `page.tsx`
- **State Management**: Use Redux Toolkit for global state (e.g., booking steps in `bookingSlice`), RTK Query for server state
- **Authentication**: NextAuth.js on client, JWT middleware on server. User ID attached to `req.userId` in controllers
- **Error Handling**: Controllers return JSON with `message` and data. Client uses `react-toastify` for notifications
- **Folder Structure**: Note `dashbord/` (typo for dashboard) in components. Types in `src/types/`, utils in `src/utils/`
- **API Responses**: Standard format `{ booking: BookingType, message: string }` for bookings

## Integrations and Dependencies
- **Payments**: Paystack via `@paystack/inline-js` on client, handled in `BookingPayment` component
- **Media**: Cloudinary for image uploads, configured in server `config/cloudinary.config.ts`, used in booking controllers for dynamic folders like `bookings/{clientName}/{bookingId}/images`
- **Emails**: SendGrid via `@sendgrid/mail` for notifications, templates in `src/templates/`
- **Database**: Mongoose models with schemas in `src/models/`, connection in `config/db.config.ts`

## Examples
- Creating a booking: Use `useCreateBookingMutation` hook in components, sends POST to `/api/user/booking`, updates Redux state
- File uploads: Use `multer` with Cloudinary storage in controllers, public_id from file name
- Routing: Admin routes under `/api/admin/`, user under `/api/user/`, protected by auth middleware</content>
<parameter name="filePath">/Users/momodustudios/Desktop/studio-booking/.github/copilot-instructions.md