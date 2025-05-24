export const createUserFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: 400,
  margin: 'auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: 16,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

export const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: 8,
  fontSize: '1rem',
};

export const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#0066ff',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#004ccf',
  },
};
