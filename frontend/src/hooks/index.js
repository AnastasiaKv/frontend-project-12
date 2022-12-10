import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ApiContext } from '../contexts/ApiContext';

const useAuth = () => useContext(AuthContext);
const useApi = () => useContext(ApiContext);

export { useAuth, useApi };
