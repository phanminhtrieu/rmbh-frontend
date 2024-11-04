import React, { useEffect, useState } from "react";
import axios from "axios";

const LearnersContent = () => {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await axios.get("/api/learners"); // Thay đổi URL này theo API của bạn
        setLearners(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h4 className="font-bold text-blue-600 mb-2">Learners</h4>
      <hr className="border-t border-blue-600 mb-4" />
      {learners.length > 0 ? (
        <ul>
          {learners.map((learner) => (
            <li key={learner.id} className="mb-2">
              {learner.name}
            </li>
          ))}
        </ul>
      ) : (
        <div>No learners found.</div>
      )}
    </div>
  );
};

export default LearnersContent;
