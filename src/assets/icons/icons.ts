// 📁 src/assets/icons/icons.ts
import IC_add_photo_alternate from '@/assets/svgs/add_photo_alternate.svg?react';
import IC_chat from '@/assets/svgs/chat.svg?react';
import IC_clear from '@/assets/svgs/clear.svg?react';
import IC_done from '@/assets/svgs/done.svg?react';
import IC_create from '@/assets/svgs/create.svg?react';
import IC_error_outline from '@/assets/svgs/error_outline.svg?react';
import IC_delete_forever from '@/assets/svgs/delete_forever.svg?react';
import IC_folder_open from '@/assets/svgs/folder_open.svg?react';
import IC_more_vert from '@/assets/svgs/more_vert.svg?react';
import IC_navigate_before from '@/assets/svgs/navigate_before.svg?react';
import IC_reorder from '@/assets/svgs/reorder.svg?react';
import IC_settings from '@/assets/svgs/settings.svg?react';

export const IconMap = {
  IC_add_photo_alternate,
  IC_chat,
  IC_clear,
  IC_done,
  IC_create,
  IC_error_outline,
  IC_delete_forever,
  IC_folder_open,
  IC_more_vert,
  IC_navigate_before,
  IC_reorder,
  IC_settings,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizes = {
  lg: 24,
  md: 20,
  sm: 16,
} as const;

export type IconSizeTypes = keyof typeof IconSizes;