/**
 * ApiContext attaches the user's authentication token to API requests when possible.
 * It also handles tags to refresh appropriate queries after a mutation.
 */

import { createContext, useContext, useState } from "react";

import { useAuth } from "../auth/AuthContext";

export const API = "https://fitnesstrac-kr.herokuapp.com/api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  /**
   * Makes an API call and parses the response as JSON if possible.
   * Throws an error if anything goes wrong.
   */
  const request = async (resource, options) => {
    const response = await fetch(API + resource, {
      ...options,
      headers,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : undefined;
    if (!response.ok) throw Error(result?.message ?? "Something went wrong :(");
    return result;
  };

  const [tags, setTags] = useState({});

  /** Stores the provided query function for a given tag */
  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  /** Calls all query functions associated with the given tags */
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
