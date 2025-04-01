import React, { useEffect, useState } from "react";
import axios from "axios";

const GetFeedback = ({ organizationID }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/feedback?organizationID=${organizationID}`,
          { withCredentials: true }
        );
        setFeedback(response.data.feedback);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    if (organizationID) {
      fetchFeedback();
    }
  }, [organizationID]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Feedback Received</h2>

      {loading && <p className="text-gray-500">Loading feedback...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && feedback.length === 0 && (
        <p className="text-gray-400">No feedback available yet.</p>
      )}

      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-sm">
            <p className="text-gray-800">{item.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              — {item.user?.name || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetFeedback;
