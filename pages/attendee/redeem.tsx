import { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Rating,
} from '@mui/material';

export default function RedeemCertificate() {
    const [uniqueCode, setUniqueCode] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [experience, setExperience] = useState('');
    const [message, setMessage] = useState('');
    const [certificateLink, setCertificateLink] = useState('');

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/certificates/redeem', {
                uniqueCode,
                feedback: {
                    rating,
                    experience,
                },
            });
            setMessage('Certificate redeemed successfully!');
            setCertificateLink(data.certificateLink);
        } catch (err) {
            console.error(err);
            setMessage('Failed to redeem the certificate. Please check the unique code.');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
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
                    Redeem Certificate
                </Typography>
                <Box component="form" onSubmit={handleRedeem} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="uniqueCode"
                        label="Unique Code"
                        name="uniqueCode"
                        value={uniqueCode}
                        onChange={(e) => setUniqueCode(e.target.value)}
                    />
                    <Typography component="legend" sx={{ mt: 2 }}>
                        Rate Your Experience
                    </Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="experience"
                        label="Describe Your Experience"
                        name="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Redeem Certificate
                    </Button>
                </Box>
                {message && (
                    <Typography sx={{ mt: 2, color: certificateLink ? 'green' : 'red' }}>
                        {message}
                    </Typography>
                )}
                {certificateLink && (
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() => window.open(certificateLink, '_blank')}
                    >
                        View Certificate
                    </Button>
                )}
            </Box>
        </Container>
    );
}
