import React from "react";

export default function Page1({ goNextPage }) {
  const [formData, setFormData] = React.useState({ code: "", email: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit called");
    const { code, email } = formData;
    localStorage.setItem("code", code);
    localStorage.setItem("email", email);
    goNextPage();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        padding: "50px",
        borderRadius: "20px",
        background: "white",
        color: "purple",
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="code"
          defaultValue={localStorage.getItem("code")}
          onChange={handleChange}
          placeholder="Enter your access code"
          required
        />
        <br />
        <br />
        <br />
        <input
          type="email"
          name="email"
          defaultValue={
            localStorage.getItem("email") || "ramthapa9221@gmail.com"
          }
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
        <p style={{ fontSize: "10px" }}>
          Your email address will be used to provide you the url for your
          processed video.
        </p>
      </form>
    </div>
  );
}
