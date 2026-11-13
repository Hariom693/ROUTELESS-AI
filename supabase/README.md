# ROUTELESS AI – Supabase Setup Instructions

## Database Setup via SQL Editor
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create or select your project.
3. Open the **SQL Editor** from the left navigation bar.
4. Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql`.
5. Click **Run**. All 10 tables, Row Level Security (RLS) policies, and sample data will be created instantly.

## Environment Variables
In `d:\Rural Mobility\.env`, set your project credentials:

```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_GEMINI_API_KEY=<your-gemini-api-key>
```

## Demo Credentials (Instant Access)
For demonstration and testing without backend configuration:
- **Student Account**: `student@demo.com` / `demo1234`
- **Admin Account**: `admin@demo.com` / `demo1234`
- **Driver Account**: `driver@demo.com` / `demo1234`

Any valid email and password can also be entered in the login form or registered via the Registration page.
