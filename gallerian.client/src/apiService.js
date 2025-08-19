export const fetchArtwork = async () => {
  try {
    const response = await fetch(`${API_URL}/artwork/recent`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch artwork:", error);
    throw error;
  }
};