async function test() {
  const url = "https://wikied-api.vercel.app/6-8/articles?page=1&pageSize=10&orderBy=recent";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch articles");
    } else {
      throw new Error("Failed to fetch articles");
    }
  }
}

export default test;
