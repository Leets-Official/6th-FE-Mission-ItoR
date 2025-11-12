import clsx from "clsx";
import type {
  ElementType,
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react";

/* 공통 레이아웃 래퍼 컴포넌트 */
type AsProp<T extends ElementType> = { as?: T };

type ContainerProps<T extends ElementType = "section"> = PropsWithChildren<
  {
    /* 공통 스타일에 병합할 추가 클래스 */
    className?: string;
  } & AsProp<T>
> &
  Omit<ComponentPropsWithoutRef<T>, "className" | "children" | "as">;

export default function Container<T extends ElementType = "section">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "section") as ElementType;

  return (
    <Tag
      className={clsx(
        "flex max-w-[688px] py-3 flex-col items-start self-stretch",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
