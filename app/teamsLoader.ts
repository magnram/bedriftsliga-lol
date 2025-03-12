import { json, LoaderFunction } from "@remix-run/node";
import path from "path";
import os from "os";
import { promises as fs } from "fs";

export const loader: LoaderFunction = async () => {
  const tournamentId = "eb388939-ab0a-47f1-aedb-12f2ceb3738b";
  // Use the OS temporary folder instead of process.cwd()
  const cacheDir = path.join(os.tmpdir(), "cache");
  const filePath = path.join(cacheDir, `${tournamentId}.json`);

  console.log("Loader called for tournament:", tournamentId);

  const now = new Date();
  // Create a Date object for today at 18:00 (6:00 PM)
  const sixPmToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);

  let useCache = false;

  try {
    await fs.access(filePath);
    const stats = await fs.stat(filePath);

    // If it's before 18:00, or the cached file was updated after 18:00 today, it's valid
    if (now < sixPmToday || stats.mtime >= sixPmToday) {
      useCache = true;
    }
  } catch (error) {
    // Cache file doesn't exist or cannot be accessed.
  }

  if (useCache) {
    const fileContents = await fs.readFile(filePath, "utf8");
    return json({ data: JSON.parse(fileContents) });
  } else {
    console.log("Cache invalid or not found. Fetching from API...", error);
    const response = await fetch(
      `https://app.bedriftsligaen.no/api/Tournament/cached/${tournamentId}/teams`
    );
    const data = await response.json();

    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Cached data written to:", filePath);

    return json({ data: data });
  }
};
