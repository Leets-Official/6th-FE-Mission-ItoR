import {
  MainTypeHeader,
  DetailTypeHeader,
  WriteTypeHeader,
  MypageTypeHeader,
  EditProfileTypeHeader,
} from '@/components/common/Pageheader/RightRenders';

type PageHeaderType = 'main' | 'detail' | 'write' | 'mypage' | 'editprofile';

interface RenderProps {
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const PageHeaderRenderers = {
  main: (_props?: RenderProps) => <MainTypeHeader />,
  detail: (_props?: RenderProps) => <DetailTypeHeader />,
  write: (_props?: RenderProps) => <WriteTypeHeader />,
  mypage: (_props?: RenderProps) => <MypageTypeHeader />,
  editprofile: (props?: RenderProps) => <EditProfileTypeHeader {...props} />,
} as const;

export type { PageHeaderType, RenderProps };
