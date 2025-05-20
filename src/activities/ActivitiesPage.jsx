//Imports
import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import useCurrentUser from "../api/useCurrentUser";

export default function ActivitiesPage() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { user: currentUser, loading: userLoading } = useCurrentUser();
  const { token } = useAuth();

  const {
    mutate: addActivity,
    loading: adding,
    error: addError,
  } = useMutation("POST", "/activities", ["activities"]);

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", "/activities", ["activities"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity({ name, description }); // waits for mutation to complete
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error adding activity:", err);
    }
  };

  const handleDelete = (id) => {
    deleteActivity({}, `/activities/${id}`);
  };

  return (
    <div className="card">
      <h1>Activities</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.name}</strong>: {activity.description}
            {currentUser?.id === activity.creatorId && (
              <button
                onClick={() => handleDelete(activity.id)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </li>
        ))}
      </ul>
      {token && (
        <>
          <h2>Add Activity</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={adding}>
              Add
            </button>
            {addError && <p>Error: {addError}</p>}
          </form>
        </>
      )}

      {deleteError && <p>Error deleting: {deleteError}</p>}
    </div>
  );
}
