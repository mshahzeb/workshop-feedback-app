import { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CssBaseline,
} from '@mui/material';

export default function CreateWorkshop() {
    const [title, setTitle] = useState('');
    const [certificates, setCertificates] = useState<File[]>([]);

    const handleCreateWorkshop = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        certificates.forEach((file) => formData.append('certificates', file));

        try {
            await axios.post('/api/workshops/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Workshop created successfully!');
            window.location.href = '/organizer';
        } catch (err) {
            console.error(err);
            alert('Error creating workshop');
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
                    Create New Workshop
                </Typography>
                <Box component="form" onSubmit={handleCreateWorkshop} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Workshop Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Certificates
                        <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => setCertificates(Array.from(e.target.files || []))}
                        />
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Workshop
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
