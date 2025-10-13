import { FC } from 'react';
import { ChatIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';

export const DetailTypeHeader: FC = () => (
  <div className="flex items-center gap-2">
    <Icon size="lg" clickable>
      <ChatIcon />
    </Icon>
    <Icon size="lg" clickable>
      <MoreVertIcon />
    </Icon>
  </div>
);
