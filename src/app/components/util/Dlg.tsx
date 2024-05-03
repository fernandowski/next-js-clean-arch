import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {ReactNode, useState} from "react";

type AddTodoFormProps = {
    children: ReactNode,
    open: boolean,
    onClose: () => void,
    onSubmit: (e: any) => void,
    title: string,
    error: string
}

export default function Dlg<T>({
                                children,
                                open,
                                onClose,
                                onSubmit,
                                title,
    error = 'Something occurred'
                            }: AddTodoFormProps) {
    return (

        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        onSubmit(formJson);
                    },
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {(error.length > 0) && <Typography color="error">{error}</Typography>}
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

/*<DialogContentText>
    To subscribe to this website, please enter your email address here. We
    will send updates occasionally.
</DialogContentText>
<TextField
    autoFocus
    required
    margin="dense"
    id="name"
    name="email"
    label="Email Address"
    type="email"
    fullWidth
    variant="standard"
/>
*/
