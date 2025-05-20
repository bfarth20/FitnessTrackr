import useQuery from "./useQuery";

export default function useCurrentUser() {
  const { data, loading, error } = useQuery("/users/me", "currentUser");
  return { user: data, loading, error };
}
