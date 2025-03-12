import { useLoaderData, useParams, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { loader as teamsLoader } from "../teamsLoader";

export const loader = teamsLoader;

const getNickName = (player: any): string | undefined => {
  const nickName = player.gameAccounts.filter(
    (acc) =>
      acc.gameId === "b8105ccd-38be-4b8e-a375-16bfc1cc50d0" && acc.isConnected
  )[0]?.nick;

  if (!nickName) return;
  if (!nickName?.includes("#")) return nickName + "#EUW";
  return nickName;
};

export default function TeamDetail() {
  const { data } = useLoaderData<typeof loader>();
  const { teamName } = useParams();
  const team = data.find((team: any) => encodeURIComponent(team.team.name) === encodeURIComponent(teamName));

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  // Toggle all players by default when team data is available
  useEffect(() => {
    if (team) {
      const defaultSelected = team.team.players
        .map((player: any) => getNickName(player.player))
        .filter((nick: string | undefined): nick is string => Boolean(nick));
      setSelectedPlayers(defaultSelected);
    }
  }, [team]);

  if (!team) {
    return (
      <div className="text-center text-red-500">
        Team not found
      </div>
    );
  }

  const togglePlayer = (nick: string) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(nick)
        ? prevSelected.filter((n) => n !== nick)
        : [...prevSelected, nick]
    );
  };

  const opggMultisearchUrl = `https://www.op.gg/multisearch/euw?summoners=${selectedPlayers
    .map((s) => encodeURIComponent(s))
    .join("%2C")}`;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Back
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">{team.team.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {team.team.players.map((player: any) => {
          const nick = getNickName(player.player);
          if (!nick) return null;
          const isSelected = selectedPlayers.includes(nick);

          return (
            <div
              key={player.playerId}
              onClick={() => togglePlayer(nick)}
              className={`flex items-center p-3 rounded-md cursor-pointer transition duration-200 ${
                isSelected ? "bg-blue-300" : "bg-gray-100"
              }`}
            >
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              <p className="text-lg font-medium">{nick}</p>
            </div>
          );
        })}
      </div>
      {selectedPlayers.length > 0 && (
        <div
          className="mt-6 p-3 bg-gray-200 rounded-md cursor-pointer"
          onClick={() => {
            window.open(opggMultisearchUrl, "_blank");
          }}
        >
          <h1 className="text-xl font-bold">Multisearch op.gg</h1>
          <p>{selectedPlayers.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
