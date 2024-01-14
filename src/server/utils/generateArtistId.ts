import type { ArtistServiceInterface } from "../services/artists";

export async function generateArtistId(
  name: string,
  artistService: ArtistServiceInterface,
  checkDb = true,
): Promise<string> {
  const existingArtists = checkDb
    ? await artistService.getArtistsByName(name)
    : [];

  if (existingArtists.length === 0) {
    return name.replaceAll(" ", "");
  }
  const existingIds = existingArtists.map((artist) => artist.id);
  let idNumber = 1;
  while (existingIds.includes(`${name.replaceAll(" ", "")}${idNumber}`)) {
    idNumber++;
  }
  return `${name.replaceAll(" ", "")}${idNumber}`;
}
