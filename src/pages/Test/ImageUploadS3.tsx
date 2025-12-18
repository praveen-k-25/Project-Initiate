import React from "react";

const ImageUploadS3 = () => {
  const [file, setFile] = React.useState<any>(null);
  const [image, setImage] = React.useState<any>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const S3Link = await fetch(
      `https://1d2103g4-4000.inc1.devtunnels.ms/data/s3presigned`,
      {
        method: "POST",
        body: JSON.stringify({
          filename: file[0].name,
          filetype: file[0].type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const S3Data = await S3Link.json();
    await fetch(S3Data.url, {
      method: "PUT",
      body: file[0],
      headers: { "Content-Type": file[0].type },
    });
    console.log("S3Data url log : ", S3Data.fileName);
    setImage(S3Data.fileName);
  };

  return (
    <div className="">
      <p className="">Image Upload : </p>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="">
          <p className="font-bold ">Image : </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.target.files && setFile(e.target.files);
            }}
            className="file border-2  border-white rounded-md outline-0"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-blue-600 ml-4"
          >
            Upload
          </button>
        </div>
      </form>
      {image && (
        <img src={image} alt="" className="w-full h-auto object-contain" />
      )}
    </div>
  );
};

export default ImageUploadS3;
