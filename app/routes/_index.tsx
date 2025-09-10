import { useState, useEffect } from "react";
import {Link, useLoaderData} from "@remix-run/react";
import { loader as teamsLoader } from "../teamsLoader";

export const loader = teamsLoader;

export default function TeamList() {
  const { data } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isThunderMode, setIsThunderMode] = useState(false);

  // Epic thunder mode that triggers every few seconds
  useEffect(() => {
    const thunderInterval = setInterval(() => {
      setIsThunderMode(true);
      setTimeout(() => setIsThunderMode(false), 200);
    }, 2000);

    return () => clearInterval(thunderInterval);
  }, []);

  if (!data) {
    return (
      <div className="text-center text-red-500 animate-shake-violent text-6xl">
        ⚡ NO DATA AVAILABLE ⚡
      </div>
    );
  }

  // Filter teams based on the search term (case-insensitive)
  const filteredTeams = data.filter((team: any) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* EPIC LIGHTNING OVERLAY */}
      <div className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-100 ${
        isThunderMode ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-white animate-lightning-flash"></div>
        <div className="absolute top-1/4 left-1/4 text-9xl animate-crazy-spin">⚡</div>
        <div className="absolute top-3/4 right-1/4 text-9xl animate-crazy-spin">⚡</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl animate-mega-bounce">⚡</div>
      </div>

      {/* EPIC HEADER */}
      <div className="text-center mb-8 animate-thunder-pulse">
        <h1 className="text-8xl font-black animate-flash-colors mb-4">
          ⚡ BEDRIFTSLIGA THUNDER ⚡
        </h1>
        <div className="text-4xl animate-shake-violent">
          🌩️ CHOOSE YOUR DESTINY 🌩️
        </div>
      </div>

      {/* SUPER EPIC Search Bar */}
      <div className="mb-8 relative animate-epic-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-lg animate-thunder-pulse"></div>
        <input
          type="text"
          placeholder="⚡ SEARCH FOR TEAMS OF DESTINY ⚡"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative w-full p-6 text-2xl font-bold text-center bg-black text-white border-4 border-yellow-400 rounded-xl shadow-2xl animate-zoom-intense focus:animate-lightning-flash focus:outline-none"
        />
      </div>

      {/* EPIC TEAM LIST WITH MAXIMUM CHAOS */}
      <div className="grid gap-6">
        {filteredTeams.map((team: any, index: number) => (
          <div
            key={team.id}
            className={`relative group animate-mega-bounce`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Lightning background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-epic-glow"></div>
            
            {/* Main team card */}
            <Link
              to={`/${encodeURIComponent(team.team.name)}`}
              className="relative block p-8 bg-black border-4 border-yellow-400 rounded-2xl transform transition-all duration-300 hover:scale-110 group-hover:animate-shake-violent"
            >
              {/* Lightning bolts around the team name */}
              <div className="absolute -top-4 -left-4 text-4xl animate-crazy-spin group-hover:animate-lightning-flash">⚡</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-crazy-spin group-hover:animate-lightning-flash">⚡</div>
              <div className="absolute -bottom-4 -left-4 text-4xl animate-crazy-spin group-hover:animate-lightning-flash">⚡</div>
              <div className="absolute -bottom-4 -right-4 text-4xl animate-crazy-spin group-hover:animate-lightning-flash">⚡</div>
              
              {/* Team name with epic effects */}
              <div className="text-center">
                <div className="text-5xl font-black animate-flash-colors group-hover:animate-thunder-pulse mb-4">
                  {team.team.name}
                </div>
                
                {/* Epic lightning separator */}
                <div className="text-6xl animate-zoom-intense group-hover:animate-crazy-spin">
                  🌩️⚡🌩️⚡🌩️
                </div>
                
                {/* Battle cry */}
                <div className="text-2xl font-bold text-yellow-400 animate-mega-bounce mt-4 group-hover:animate-flash-colors">
                  ENTER THE STORM!
                </div>
              </div>
              
              {/* Particle effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-mega-bounce opacity-70"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${0.5 + Math.random()}s`,
                    }}
                  ></div>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* EPIC FOOTER CHAOS */}
      <div className="text-center mt-16 animate-thunder-pulse">
        <div className="text-6xl animate-flash-colors mb-4">
          ⚡🌩️ MAY THE THUNDER BE WITH YOU 🌩️⚡
        </div>
        <div className="text-4xl animate-crazy-spin">
          ⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
        </div>
      </div>
    </div>
  );
}