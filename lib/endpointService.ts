export interface EndpointPayload {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  statusCode: number;
  responseBody: object;
  projectId: string;
}

export const saveMockEndpoint = async (payload: EndpointPayload) => {
  try {
    const response = await fetch('/api/configure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save dynamic configuration.');
    }

    return await response.json();
  } catch (error) {
    console.error('Front-end Network Sync Error:', error);
    throw error;
  }
};