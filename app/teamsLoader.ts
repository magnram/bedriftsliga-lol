import { json, LoaderFunction } from "@remix-run/node";
import path from "path";
import os from "os";
import { promises as fs } from "fs";

export const loader: LoaderFunction = async () => {
  const tournamentId = "eb388939-ab0a-47f1-aedb-12f2ceb3738b";
  const competitionId = "cc865220-10a7-4ee3-9fce-330d32177cea";

  const cacheDir = path.join(os.tmpdir(), "cache");

  // Create a date string in YYYY-MM-DD format for today's date.
  const todayDate = new Date().toISOString().split("T")[0];
  const fileName = `${tournamentId}-${todayDate}.json`;
  const filePath = path.join(cacheDir, fileName);

  console.log("Loader called for tournament:", tournamentId);

  // Remove any old cache files for this tournament that don't match today's date
  try {
    const files = await fs.readdir(cacheDir);
    const tournamentFiles = files.filter(
      (file) => file.startsWith(tournamentId) && file !== fileName
    );
    for (const oldFile of tournamentFiles) {
      await fs.unlink(path.join(cacheDir, oldFile));
      console.log("Removed old cache file:", oldFile);
    }
  } catch (err) {
    // The cache directory may not exist yet. This is fine.
    console.log("Cache directory not found or error reading it:", err);
  }

  try {
    // If today's cache file exists, use it.
    await fs.access(filePath);
    const fileContents = await fs.readFile(filePath, "utf8");
    return json({ data: JSON.parse(fileContents) });
  } catch (error) {
    console.log("Today's cache file not found. Fetching from API...", error);
    const response = await fetch(
      `https://app.bedriftsligaen.no/api/Tournament/cached/${tournamentId}/teams`
    );
    const data = await response.json();

    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Cached data written to:", filePath);

    return json({ data });
  }
};
