import { ComponentWithBase } from './mypage';

// PageHeader 타입
export type PageHeaderType = 'main' | 'detail' | 'write' | 'mypage' | 'editprofile';

// 공통 헤더 액션 Props
export interface HeaderActionProps {
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

// 제네릭 타입
export type ComponentWithActions<T = {}> = HeaderActionProps & T;

// PageHeader 컴포넌트
export type PageHeaderProps = ComponentWithBase<
  ComponentWithActions<{
    type: PageHeaderType;
    onHamburgerClick?: () => void;
    isOwner?: boolean;
  }>
>;

// PageHeaderLeft
export type PageHeaderLeftProps = {
  onHamburgerClick?: () => void;
};

// PageHeaderRight
export type PageHeaderRightProps = ComponentWithActions<{
  type: PageHeaderType;
  isOwner?: boolean;
}>;

// RightRenders
export type RenderProps = HeaderActionProps & {
  isOwner?: boolean;
};

