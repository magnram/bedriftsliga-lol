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

  try {
    await fs.access(filePath);
    const fileContents = await fs.readFile(filePath, "utf8");
    return json({ data: JSON.parse(fileContents) });
  } catch (error) {
    console.log("Cache file not found or error reading it. Fetching from API...", error);
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
