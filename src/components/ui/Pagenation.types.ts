export interface PagenationProps {
  page: number;             
  totalPages: number;        
  onChange: (next: number) => void;
  showArrows?: boolean;
  maxButtons?: number;
  className?: string;
}
