import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { UserTooltipContentProps } from '../models/interface.ts';
import { avatarStyle, tooltipBoxStyle, tooltipHeaderStyle } from './userTooltipContent.styles.ts';

export const UserTooltipContent: React.FC<UserTooltipContentProps> = ({ user }) => (
  <Box sx={tooltipBoxStyle}>
    <Box sx={tooltipHeaderStyle}>
      <Avatar src={user.avatar} sx={avatarStyle} />
      <Typography fontWeight='bold'>
        {user.first_name} {user.last_name}
      </Typography>
    </Box>
    <Typography variant='body2'>
      <b>Email:</b> {user.email}
    </Typography>
  </Box>
);
