import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only asset availability (node:fs — do not import from client
 * components). The existsSync check runs once at module evaluation, i.e.
 * at build time for statically generated pages: dropping the photo into
 * /public/images after a build requires a rebuild to be picked up.
 *
 * Pages share one fallback policy: render the photo when TEAM_PHOTO is
 * set, otherwise a decorative silver placeholder.
 */
export const TEAM_PHOTO: string | null = existsSync(
  join(process.cwd(), "public", "images", "team.jpg")
)
  ? "/images/team.jpg"
  : null;

/** Alt text shared by every placement of the team photo. */
export const TEAM_PHOTO_ALT =
  "The Brain Thrive Wellness team at the clinic in Choctaw, Oklahoma";
