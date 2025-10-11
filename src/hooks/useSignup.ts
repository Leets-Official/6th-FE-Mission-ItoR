import { useState, useRef, ChangeEvent } from 'react';

interface UseSignupReturn {
  previewImage: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
}

export const useSignup = (defaultImage: string): UseSignupReturn => {
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    previewImage,
    fileInputRef,
    handleImageUpload,
    handleButtonClick,
  };
};
