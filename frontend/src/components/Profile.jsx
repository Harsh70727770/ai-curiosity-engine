import { useState } from "react";

export default function Profile() {
  const [preview, setPreview] = useState(
    localStorage.getItem("user_avatar") || "https://i.pravatar.cc/100"
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      localStorage.setItem("user_avatar", imageURL);
    }
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
    </div>
  );
}