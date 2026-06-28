const API_BASE_URL = "https://bender.cs.csubak.edu/miranda";

export async function getSightings() {
  const response = await fetch(`${API_BASE_URL}/sightings`);
  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }
  return response.json();
}

export async function createSighting(sighting) {
  const response = await fetch(`${API_BASE_URL}/sightings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sighting),
  });

  if (!response.ok) {
    throw new Error("Failed to create sighting");
  }

  return response.json();
}