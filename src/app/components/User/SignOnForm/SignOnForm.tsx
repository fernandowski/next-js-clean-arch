'use client';
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./page.module.css";
import {Button, TextField, Typography} from "@mui/material";

export default function SignOnForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/v1/user/sign-on', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                router.push('/dashboard');
            } else {
                const { error } = await res.json();
                setError(error);
            }
        } catch (error) {
            console.log(error);
            setError('Failed to register');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Typography variant="h4">Sign On</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button variant="contained" type="submit">Register</Button>
                </form>
            </div>
        </div>
    );
}
