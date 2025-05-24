export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserFormProps {
  mode: 'create' | 'edit';
  initialData?: User;
}

export interface UserFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserTableProps {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export interface UserTooltipContentProps {
  user: User;
}

export interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface SessionState {
  username: string;
  loginTime: string; 
}

export interface UsersState {
  externalUsers: User[];
  localUsers: User[];
  page: number;
  flagloadMorePage: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}