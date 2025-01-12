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

export default function OrganizerDashboard() {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        const fetchWorkshops = async () => {
            const { data } = await axios.get('/api/workshops');
            setWorkshops(data.workshops);
        };
        fetchWorkshops();
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
                    Organizer Dashboard
                </Typography>
                <Box sx={{ width: '100%', mt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Workshop Title</TableCell>
                                    <TableCell>Unique Code</TableCell>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>Certificates Redeemed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workshops.map((workshop) => (
                                    <TableRow key={workshop.uniqueCode}>
                                        <TableCell>{workshop.title}</TableCell>
                                        <TableCell>{workshop.uniqueCode}</TableCell>
                                        <TableCell>
                                            {new Date(workshop.createdDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{workshop.redeemed.length}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => (window.location.href = '/organizer/create-workshop')}
                >
                    Create New Workshop
                </Button>
            </Box>
        </Container>
    );
}
