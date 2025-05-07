import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';
import { authenticateUser } from '@services/AuthServices';

export default function LoginScreen() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const result = await authenticateUser({ login, password });

        setLoading(false);
        setError(!result.success);
        setMessage(result.message);
    };

    return (
        <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 8,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
        }}
        >
        <Typography variant="h5" align="center" gutterBottom>
            Connexion
        </Typography>

        {message && (
            <Alert severity={error ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
            </Alert>
        )}

        <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
        />
        <TextField
            fullWidth
            margin="normal"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
        >
            {loading ? <CircularProgress size={24} /> : 'Se connecter'}
        </Button>
        </Box>
    );
}
