import { useState } from "react";

export default function Profile({ navigateTo }) {
  const [preview, setPreview] = useState(
    localStorage.getItem("user_avatar") || "https://i.pravatar.cc/100"
  );

  // ✅ NEW: name state
  const [name, setName] = useState(
    localStorage.getItem("user_name") || ""
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  // ✅ NEW: save function
  const handleSave = () => {
    localStorage.setItem("user_avatar", preview);
    localStorage.setItem("user_name", name);

    // redirect to portal
    if (navigateTo) {
      navigateTo("portal");
    }

    // refresh navbar
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Update Profile</h2>

      <img
        src={preview}
        alt="profile"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #38bdf8",
          marginBottom: "15px"
        }}
      />

      <br />

      <input type="file" accept="image/*" onChange={handleImage} />

      <br /><br />

      {/* ✅ NEW: Name input */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          width: "250px"
        }}
      />

      <br /><br />

      {/* ✅ NEW: Save button */}
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0f172a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Save
      </button>
    </div>
  );
}