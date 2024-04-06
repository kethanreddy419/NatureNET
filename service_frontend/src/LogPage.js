import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogPage.css";
import SettingsIcon from "./settings.png";
import LivestreamIcon from "./livestream.png";
import HomeIcon from "./home.png";
import Logo from "./logo.png";

function LogPage() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserIdAndLogs = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Retrieve user email from local storage
        const userEmail = localStorage.getItem("userEmail");

        console.log(localStorage.getItem("userEmail"));

        // Check if userEmail exists
        if (!userEmail) {
          throw new Error("User email not found.");
        }

        // Fetch the user ID from the email using a GET request with query parameters
        const userIdResponse = await axios.get(
          `http://localhost:3000/user/userIdFromEmail?email=${userEmail}`
        );

        // Check if userIdResponse has data and an id
        if (userIdResponse.data && userIdResponse.data.id) {
          const userId = userIdResponse.data.id;

          // Fetch logs with the obtained userId
          const logsResponse = await axios.get("http://localhost:3000/log", {
            headers: { "user-id": userId },
          });
          setLogs(logsResponse.data);
        } else {
          throw new Error("User ID not found for the given email."); 
        }
      } catch (error) {
        console.error("Error fetching user ID or logs:", error);
        setError("Failed to fetch user ID or logs.");
      }

      setIsLoading(false);
    };

    fetchUserIdAndLogs();
  }, []);
  const handleSettings = () => navigate("/settings");
  const handleLivestream = () => navigate("/livestream");

  return (
    <div className="header-container">
      <div className="title-settings">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="title-space"></div>
        <div className="title-container">
          <h2 className="log-title">NatureNet</h2>
        </div>
        <div className="icons-container">
          <img
            src={SettingsIcon}
            alt="Settings"
            className="nav-icon"
            onClick={handleSettings}
          />
          <img
            src={LivestreamIcon}
            alt="Livestream"
            className="nav-icon"
            onClick={handleLivestream}
          />
          <img src={HomeIcon} alt="Home" className="nav-icon" />
        </div>
      </div>

      {isLoading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : logs.length > 0 ? (
        <div className="logs-container">
          {logs.map((log) => (
            <div key={log.id} className="log-item">
              <div className="log-info">
                <div className="left-info">
                  <div>ID: {log.id}</div>
                  {/* Adjust according to your log object structure */}
                  <div>Timestamp: {log.timestamp}</div>
                  <div>User ID: {log.userId}</div>
                  <div>Animal ID: {log.animalId}</div>
                </div>
                <div className="right-info">
                  <img src={log.image} alt="Log" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No logs found.</p>
      )}
    </div>
  );
}

export default LogPage;