import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CssBaseline,
    MenuItem,
} from '@mui/material';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState<'organizer' | 'attendee'>('organizer');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/signup', { email, password, type });
            alert('Signup successful!');
            router.push('/login');
        } catch (err) {
            console.error(err);
            alert('Signup failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        label="User Type"
                        value={type}
                        onChange={(e) => setType(e.target.value as 'organizer' | 'attendee')}
                    >
                        <MenuItem value="organizer">Organizer</MenuItem>
                        <MenuItem value="attendee">Attendee</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
