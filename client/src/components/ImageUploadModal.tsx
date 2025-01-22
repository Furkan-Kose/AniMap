import { useState } from "react";
import { FaCamera, FaCloudUploadAlt, FaFileImage, FaTimes } from "react-icons/fa";

interface ImageUploadModalProps {
  onClose: () => void;
  onSave: (image: File | null, tempImage: string | null) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose, onSave }) => {
  const [image, setImage] = useState<File | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setTempImage(URL.createObjectURL(file));
        setImage(file);
      } else {
        alert("Lütfen geçerli bir resim dosyası seçin.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setTempImage(URL.createObjectURL(file));
        setImage(file);
      } else {
        alert("Lütfen geçerli bir resim dosyası seçin.");
      }
    }
  };

  const openCamera = () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = (e: Event) => handleFileSelect(e as any);
      input.click();
    } catch (error) {
      alert("Kamera açılırken bir hata oluştu.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Resim Ekle</h2>

        <div
          className={`transition-all duration-300 border-2 border-dashed p-10 rounded-lg cursor-pointer ${
            dragging ? "border-yellow-500 bg-yellow-100" : "border-gray-400"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {tempImage ? (
            <img src={tempImage} alt="Preview" className="h-40 mx-auto rounded-md shadow-md" />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <FaCloudUploadAlt size={50} />
              <p>Resmi sürükleyip bırakın veya</p>
              <label htmlFor="fileInput" className="text-yellow-500 font-bold cursor-pointer">
                Dosya seçin
              </label>
            </div>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="fileInput" />

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <label htmlFor="fileInput" className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-md cursor-pointer">
            <FaFileImage size={20} className="mr-2" /> Dosya Seç
          </label>

          <button onClick={openCamera} className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-md">
            <FaCamera size={20} className="mr-2" /> Kamerayı Aç
          </button>
        </div>

        <button
          onClick={() => onSave(image, tempImage)}
          className="mt-4 block w-full bg-green-500 text-white py-2 rounded-md"
          disabled={!tempImage}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default ImageUploadModal;
