import React from "react";
import axios from "axios";

const url = "";
export default function Page2() {
  const [videoFile, setVideoFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [info, setInfo] = React.useState("");

  React.useEffect(() => {
    if (info !== "")
      setTimeout(() => {
        setInfo("");
      }, 3000);
  }, [info]);

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setInfo("Please wait while uploading process completes.");

    const file = videoFile;
    console.log(file);
    if (file) {
      const file_name = file.name;
      const file_type = file.type;

      axios({
        method: "get",
        url: url,
        params: {
          email: localStorage.getItem("email") || "ramthapa9221@gmail.com",
          code: localStorage.getItem("code"),
          file_name,
          file_type,
        },
      })
        .then((response) => {
          console.log(response, "check response");
          const signedUrl = response.data;

          // //UPLOAD FILE TO S3
          axios({
            method: "put",
            url: signedUrl,
            data: file,

            onUploadProgress: (progressEvent) => {
              console.log(progressEvent, "check progress data");
              setProgress((progressEvent.loaded / progressEvent.total) * 100);
              if (progressEvent.loaded / progressEvent.total === 1) {
                setProgress(0);
                setVideoFile(null);
                setLoading(false);
                setInfo(
                  "Successfully done. Youll receive an email with your mp4 link soon."
                );
              }
            },
            headers: {
              "Content-Type": file.type,
            },
          })
            .then((response) => {
              setLoading(false);

              console.log(response, "check response from s3");
            })
            .catch((err) => {
              setLoading(false);

              console.log(err, "check error from s3");
              setInfo("error while upload to s3");
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);

          setInfo("Error while getting Signed Url");
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="hiddenFileInput">
          <div
            style={{
              padding: "10px",
              color: "purple",
              background: "white",
              borderRadius: "5px",
              cursor: "pointer",
              height: "50px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {videoFile ? videoFile.name : "Click to select video file"}
          </div>
          <input
            id={"hiddenFileInput"}
            style={{ display: "none" }}
            type="file"
            name="file"
            onChange={!loading && onChangeHandler}
          />
        </label>

        <br />
        <br />
        <button type="submit" disabled={!videoFile && loading}>
          Upload
        </button>
      </form>
      {videoFile && (
        <video
          height="300"
          width="300"
          style={{ position: "absolute", top: "50px", margin: "auto" }}
        >
          <source src={URL.createObjectURL(videoFile)} id="video" />
          Your browser does not support HTML5 video.
        </video>
      )}
      {progress > 0 && (
        <div
          style={{
            position: "absolute",
            margin: "auto",
            background: "black",
            opacity: 0.8,
            color: "white",
            bottom: "10px",
            padding: "20px 30px",
          }}
        >
          {progress.toFixed(0)}% uploaded
        </div>
      )}
      {info && <p>{info}</p>}
    </div>
  );
}
