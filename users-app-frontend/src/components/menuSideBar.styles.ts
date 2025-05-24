import { SxProps, Theme } from '@mui/material';

export const pageContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const sidebarStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '70px',
};

export const userNameStyle: SxProps<Theme> = {
  mt: 1,
  cursor: 'pointer',
  color: '#1976d2',
  fontWeight: 500,
};
