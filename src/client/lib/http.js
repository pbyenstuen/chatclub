const checkResponse = (res, url) => {
  if (!res.ok) {
    let error = `${res.status} ${res.statusText}`;

    if (url.startsWith("/auth")) {
      const statusCode = res.status.toString();

      if (url.startsWith("/auth/user") && statusCode === "401") {
        return;
      }

      if (statusCode !== "200" || statusCode !== "201") error = `Error when connecting to server: ${res.status} ${res.statusText}`;
      if (statusCode === "400" || statusCode === "401") error = "Invalid username/password";
      if (statusCode === "500") error = "Something went wrong: Failed to create user";
    }

    throw error;
  }
}

export const fetchJSON = async (url, options = null) => {
  const response = await fetch(`http://localhost:3000/api${url}`, options);
  checkResponse(response, url);
  return await response.json();
}

export const postJSON = async (url, { method, payload }) => {
  const response = await fetch(`http://localhost:3000/api${url}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    }
  });
  checkResponse(response, url);
  return await response;
}

export const getResponse = async (url, options = null) => {
  const response = await fetch(`http://localhost:3000/api${url}`, options);
  checkResponse(response, url);
  return await response;
};