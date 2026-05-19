// app/(Admin)/_components/ImagePicker.tsx
"use client";
import React, { useState, useRef } from "react";
import { uploadImage } from "@/app/actions/uploadImage";
import { toast } from "sonner";

interface ImagePickerProps {
  onImageSelect: (imageUrl: string, fileId: string) => void;
  currentImage?: string;
  label?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelect,
  currentImage,
  label = "Menu Image",
}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    currentImage || null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.",
      );
      return;
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setSelectedImageUrl(previewUrl);
    setIsUploading(true);

    // Upload to Supabase
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);

    if (result.error) {
      toast.error(result.error);
      setSelectedImageUrl(currentImage || null);
    } else if (result.url) {
      setSelectedImageUrl(result.url);
      onImageSelect(result.url, result.url); // fileId is the URL for now
      toast.success("Image uploaded successfully!");
    }

    setIsUploading(false);
    URL.revokeObjectURL(previewUrl);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Clickable placeholder */}
      <div onClick={handleClick} className="cursor-pointer">
        {isUploading ? (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="text-sm text-gray-500 mt-2">Uploading...</span>
          </div>
        ) : selectedImageUrl ? (
          <div className="relative group">
            <img
              src={selectedImageUrl}
              alt="Menu item"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Click to change image</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-4xl mb-2">📷</span>
            <span className="text-sm text-gray-500">
              Click to upload an image
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
