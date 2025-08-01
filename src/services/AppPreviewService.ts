export const baseURL =
  window.location.origin +
  (window.location.origin.startsWith("http://localhost")
    ? process.env.ENVIRONMENT
    : "");

export class AppPreviewService {
  constructor() {}
  // Helper method to handle API calls
  async fetchAPI(endpoint: string, options = {}) {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...defaultOptions,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.error && data.error?.Message == "Not Authenticated") {
        location.reload();
      }

      return await data;
    } catch (error) {
      // console.error(`API Error (${endpoint}):`, error);
      throw error;
    } finally {
      // Optionally handle any cleanup or finalization here
    }
  }

  async getTranslatedVersion(versionId: string, language: string) {
    const response = await this.fetchAPI(
      "/api/toolbox/translated-appversion-prevew",
      {
        method: "POST",
        body: JSON.stringify({
          AppVersionId: versionId,
          language: language,
        }),
      }
    );
    return response;
  }
}
