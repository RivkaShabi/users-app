import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Box, Button, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { UserTableProps } from '../models/interface.ts';
import { selectLocalUsers, selectUsers } from '../redux/userSlice.ts';
import {
  userTableActionsCellStyle,
  userTableContainerStyle,
  userTableNameCellStyle,
  userTableRowPaperStyle,
} from './userTable.styles.ts';
import { UserTooltipContent } from './userTooltipContent.tsx';

// Responsive flex row: if not enough space, items wrap to next line (no size change, no view switch)
export const UserTable: React.FC<UserTableProps> = ({ onEdit, onDelete }) => {
  const localUsers = useSelector(selectLocalUsers);
  const Users = useSelector(selectUsers);

  return (
    <Box sx={userTableContainerStyle}>
      {/* Rows */}
      {Users.map((user) => {
        const localUser = localUsers.find((u) => u.id === user.id);
        return (
          <Paper
            key={user.id}
            sx={{
              ...userTableRowPaperStyle,
              ...(localUser && { backgroundColor: '#e0f7fa' }),
            }}
          >
            <Tooltip title={<UserTooltipContent user={user} />} arrow placement='top'>
              <Box
                sx={{
                  ...userTableNameCellStyle,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 0, sm: 2 },
                  width: '100%',
                }}
              >
                <span>
                  {user.last_name} {user.first_name}
                </span>
                <Box
                  component='span'
                  sx={{
                    color: 'gray',
                    fontSize: '0.95em',
                    ml: { xs: 0, sm: 2 },
                    mt: { xs: 0.5, sm: 0 },
                    wordBreak: 'break-all',
                  }}
                >
                  {user.email}
                </Box>
              </Box>
            </Tooltip>
            <Box sx={userTableActionsCellStyle}>
              {localUser && (
                <>
                  <Button onClick={() => onEdit(localUser)} sx={{ minWidth: 'auto', p: 0.5 }}>
                    <EditSquareIcon />
                  </Button>
                  <Button
                    color='error'
                    onClick={() => onDelete(localUser.id)}
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
