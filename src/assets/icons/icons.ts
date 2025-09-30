import IC_add_photo_alternate from '/public/svgs/add_photo_alternate.svg';
import IC_chat from '/public/svgs/chat.svg';
import IC_clear from '/public/svgs/clear.svg';
import IC_done from '/public/svgs/done.svg';
import IC_create from '/public/svgs/create.svg';
import IC_error_outline from '/public/svgs/error_outline.svg';
import IC_delete_forever from '/public/svgs/delete_forever.svg';
import IC_floder_open from '/public/svgs/floder_open.svg';
import IC_more_vert from '/public/svgs/more_vert.svg';
import IC_navigate_before from '/public/svgs/navigate_before.svg';
import IC_reorder from '/public/svgs/reorder.svg';
import IC_settings from '/public/svgs/settings.svg';

export const IconMap = {
    IC_add_photo_alternate,
    IC_chat,
    IC_clear,
    IC_done,
    IC_create,
    IC_error_outline,
    IC_delete_forever,
    IC_floder_open,
    IC_more_vert,
    IC_navigate_before,
    IC_reorder,
    IC_settings
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizes = {
  lg: 24,
  md: 20,
  sm: 16,
};

export type IconSizeTypes = keyof typeof IconSizes;