import { useState } from "react";
import {Link, useLoaderData} from "@remix-run/react";
import { loader as teamsLoader } from "../teamsLoader";

export const loader = teamsLoader;

export default function TeamList() {
  const { data } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) {
    return <div className="text-center text-red-500">No data available</div>;
  }

  // Filter teams based on the search term (case-insensitive)
  const filteredTeams = data.filter((team: any) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Team List */}
      <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {filteredTeams.map((team: any) => (
          <li key={team.id} className="p-4 hover:bg-gray-50">
            <Link
              to={`/${encodeURIComponent(team.team.name)}`}
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {team.team.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
