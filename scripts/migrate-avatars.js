
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "profile-pics";
const PREFIX = "avatars";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  // increase timeout for large batches
  global: {
    fetch: global.fetch,
  },
});

(async function migrate() {
  try {
    console.log(`Listing files under ${PREFIX}/`);
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET)
      .list(PREFIX);

    if (listError) throw listError;
    if (!files || files.length === 0) {
      console.log("No files found under avatars/ to migrate.");
      return;
    }

    console.log(
      `Found ${files.length} file(s). Moving each to root of bucket...`,
    );

    for (const file of files) {
      const oldPath = `${PREFIX}/${file.name}`;
      const newPath = `${file.name}`; 

      // Attempt move API
      const { error: moveErr } = await supabase.storage
        .from(BUCKET)
        .move(oldPath, newPath);

      if (moveErr) {
        console.error(`Failed to move ${oldPath}:`, moveErr.message || moveErr);
      } else {
        console.log(`Successfully moved ${oldPath}`);
      }
    }

    console.log("Migration complete.");
  } catch (e) {
    console.error("Migration failed:", e.message || e);
    process.exit(1);
  }
})();
