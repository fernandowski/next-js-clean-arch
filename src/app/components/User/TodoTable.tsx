'use client'

import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import Dlg from "@/app/components/util/Dlg";
import {redirect, useRouter} from "next/navigation";

interface ITodo {
    id: string,
    name: string,
    description: string,
    status: string,
}

export type todo = {
    name: string,
    description: string
}

export default function TodoTable() {
    const router = useRouter();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [openDlg, setOpenDlg] = useState(false);
    const [error, setError] = useState('');

    const redirectError = useCallback((error : string) => {
        if (error === 'Unauthorized') { router.push('/sign-on'); }
    }, [router])

    const refreshData = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/todos', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });

            if (res.ok) {
                const {data}: { data: ITodo[] } = await res.json();
                setTodos(data);
            } else {
                const {error} = await res.json();
                redirectError(error);
            }
        } catch (error) {
            console.log(error);
        }
    }, [redirectError])

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleMarkAsCompleted = async (todoId : string) => {
        //
        try {
            const res = await fetch(`/api/v1/todos/${todoId}/status`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
            });

            if (res.ok) {
                refreshData();
            } else {
                const json = await res.json();
                setError(json.error);
                redirectError(json.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddTodoClick = () => {
        setOpenDlg(true)
    }

    const handleCloseDlg = () => {
        setOpenDlg(false);
        setError('');
    }

    const handleDlgOnSubmit = async (data: todo) => {
        try {
            const res = await fetch('/api/v1/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (res.ok) {
                refreshData();
                handleCloseDlg();
            } else {
                const json = await res.json();
                setError(json.error);
                redirectError(json.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Button variant="contained" onClick={handleAddTodoClick}>Add TODO</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name </TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow
                            key={todo.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{todo.name}</TableCell>
                            <TableCell align="right">{todo.description}</TableCell>
                            <TableCell align="right">{todo.status}</TableCell>
                            <TableCell align="right">
                                {todo.status === 'pending' &&
                                    <Button variant="contained" onClick={() => {
                                        handleMarkAsCompleted(todo.id);
                                    }}>Mark as
                                        Completed</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dlg<todo> open={openDlg} onClose={handleCloseDlg} onSubmit={handleDlgOnSubmit} title='Add Todo' error={error}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name='name'
                    label="name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="description"
                    name='description'
                    label="description"
                    fullWidth
                    variant="standard"
                />
            </Dlg>
        </TableContainer>
    );
}
