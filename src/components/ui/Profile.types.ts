export type ProfilePhotoSize = "xl" | "lg" | "sm";

export interface ProfilePhotoProps {
  /** 64px: lg(기본), 40px: sm, 90px: xl */
  size?: ProfilePhotoSize;
  src?: string;
  alt?: string;
  name?: string;
  initial?: string;
  className?: string;
  bgClassName?: string;
}
