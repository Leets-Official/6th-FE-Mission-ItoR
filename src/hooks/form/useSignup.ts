import { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '@/utils/schemas';

interface UseSignupReturn {
  previewImage: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  form: ReturnType<typeof useForm<SignupFormData>>;
  onSubmit: (data: SignupFormData) => void;
  handleLoginRedirect: () => void;
  isCompleteModalOpen: boolean;
  setIsCompleteModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

export const useSignup = (defaultImage: string): UseSignupReturn => {
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

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

  const onSubmit = (data: SignupFormData) => {
    setIsCompleteModalOpen(true);
  };

  const handleLoginRedirect = () => {
    setIsCompleteModalOpen(false);
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 0);
  };

  return {
    previewImage,
    fileInputRef,
    handleImageUpload,
    handleButtonClick,
    form,
    onSubmit,
    handleLoginRedirect,
    isCompleteModalOpen,
    setIsCompleteModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
  };
};
