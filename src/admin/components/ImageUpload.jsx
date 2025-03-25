import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../state/productSlice/productSlice";
import { UploadCloudIcon } from "lucide-react";

const ImageUpload = ({ onUpload }) => {
  const dispatch = useDispatch();
  const { uploadLoading } = useSelector((state) => state.product);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));

      dispatch(uploadImage(file)).then((res) => {
        if (res.payload) {
          onUpload(res.payload);
        }
      });
    },
    [dispatch, onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" width={150} />
        ) : (
          <div className="flex flex-col items-center justify-center text-blue-400">
            <UploadCloudIcon size={50} className="text-center " />
            <p>upload image or drag and drop !</p>
          </div>
        )}
      </div>
      {uploadLoading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
