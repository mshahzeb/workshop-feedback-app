import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    CssBaseline,
} from '@mui/material';

export default function AttendeeDashboard() {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            const email = localStorage.getItem('email'); // Assuming email is stored
            const { data } = await axios.get(`/api/certificates?email=${email}`);
            setCertificates(data.certificates);
        };
        fetchCertificates();
    }, []);

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Attendee Dashboard
                </Typography>
                <Box sx={{ width: '100%', mt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Workshop Title</TableCell>
                                    <TableCell>Unique Code</TableCell>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>View Certificate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {certificates.map((certificate) => (
                                    <TableRow key={certificate.uniqueCode}>
                                        <TableCell>{certificate.title}</TableCell>
                                        <TableCell>{certificate.uniqueCode}</TableCell>
                                        <TableCell>
                                            {new Date(certificate.createdDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => window.open(`/certificates/${certificate.uniqueCode}`, '_blank')}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Container>
    );
}
