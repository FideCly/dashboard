import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: [
    "/",
    "/shops",
    "/shops/[id]",
    "/shops/[id]/edit",
    "/shops/create",
    "/shops/[id]/delete",
    "/campaign",
    "/campaign/[id]",
    "/campaign/[id]/edit",
    "/scan",
    "/promotion",
    "/promotion/[id]",
    "/promotion/[id]/edit",
  ],
};
