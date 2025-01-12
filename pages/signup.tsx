import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
        <form onSubmit={handleSignup}>
            <h1>Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value as 'organizer' | 'attendee')}>
                <option value="organizer">Organizer</option>
                <option value="attendee">Attendee</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
}
