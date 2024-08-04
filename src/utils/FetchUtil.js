export async function fetchUsersByPage(url, page) {
  try {
    const response = await fetch(`${url}?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching items:", err);
  }
}
