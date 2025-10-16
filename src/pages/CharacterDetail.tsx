import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/Api";

export default function CharacterDetail() {
  const { id } = useParams({ from: "/character/$id" });
  const charId = Number(id);

  const {
    data: character,
    status,
    error,
  } = useQuery({
    queryKey: ["character", charId],
    queryFn: () => fetchCharacterById(charId),
    enabled: !!charId,
  });

  if (!charId) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Invalid character ID.</p>
        <Link to="/" className="underline text-blue-600 mt-4 block">
          ← Back to List
        </Link>
      </div>
    );
  }

  if (status === "pending")
    return <div className="p-6 text-center">Loading character...</div>;

  if (status === "error")
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          Failed to load character details: {String(error)}
        </p>
        <Link to="/" className="underline text-blue-600 mt-4 block">
          ← Back to List
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="underline text-blue-600">
        ← Back to list
      </Link>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={character?.image}
            alt={character?.name}
            className="w-40 h-40 rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2">{character?.name}</h2>
            <p className="text-gray-600 text-sm">
              {character?.species} — {character?.status}
            </p>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {character?.gender}
              </p>
              <p>
                <span className="font-semibold">Origin:</span>{" "}
                {character?.origin?.name}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {character?.location?.name}
              </p>
              <p>
                <span className="font-semibold">Episodes:</span>{" "}
                {character?.episode?.length}
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(character?.created ?? "").toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
