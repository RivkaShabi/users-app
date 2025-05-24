import { SxProps, Theme } from '@mui/material';

export const pageContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

export const sidebarStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  height: '70px',
    backgroundColor: '#f5f5f5',
    alignItems: 'center'

};

export const mainContentStyle: SxProps<Theme> = {
  flexGrow: 1,
  p: 4,
  overflowY: 'auto',
};

export const topBarStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

export const userNameStyle: SxProps<Theme> = {
  mt: 1,
  cursor: 'pointer',
  color: '#1976d2',
  fontWeight: 500,
};
