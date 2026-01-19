// "use client"
//
// import React, {useState} from "react"
// import {User} from "./columns"
//
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle, DialogTrigger,
// } from "@/components/ui/dialog"
//
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
//
// import {Input} from "@/components/ui/input"
// import {Button} from "@/components/ui/button"
// import {Label} from "@/components/ui/label"
// import axios from "axios";
//
// interface CreateUserFormProps {
//     isDialogOpen?: boolean
//     setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     setUsers: React.Dispatch<React.SetStateAction<User[]>>
// }
//
// const CreateUserForm: React.FC<CreateUserFormProps> =({isDialogOpen,setIsDialogOpen,setUsers})=> {
//
//
//     // Form state
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         role: "",
//         password: ""
//     })
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         console.log("Form submitted:", formData)
//         // Add your submit logic here
//         try {
//             const response= await axios.post(`${import.meta.env.VITE_API_URL}/create_user`, formData);
//             const newUser = response.data.user;
//             console.log("New user from API:", newUser);
//             const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
//             setUsers(usersResponse.data);
//             alert("User created successfully!")
//
//             setIsDialogOpen(false)
//             // Reset form
//             setFormData({username: "", email: "", role: "", password: ""})
//
//         } catch (error) {
//             console.error('Failed to create user:', error);
//             alert("Failed to create user. Please try again.")
//         }
//
//
//     }
//
//     const handleCancel = () => {
//         setIsDialogOpen(false)
//         setFormData({username: "", email: "", role: "", password: ""})
//     }
//
//     return (
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Create New User</DialogTitle>
//                     <DialogDescription>
//                         Fill in the details to create a new user account.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-4 py-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="username">Username</Label>
//                             <Input
//                                 id="username"
//                                 value={formData.username}
//                                 onChange={(e) => setFormData({...formData, username: e.target.value})}
//                                 placeholder="Enter username"
//                                 required
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="email" className={undefined}>Email</Label>
//                             <Input
//                                 id="email"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                                 placeholder="Enter email"
//                                 required className={undefined}                            />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="role" className={undefined}>Role</Label>
//                             <Select
//                                 value={formData.role}
//                                 onValueChange={(value) => setFormData({...formData, role: value})}
//                                 required
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select a role"/>
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="user">User</SelectItem>
//                                     <SelectItem value="admin">Admin</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="password">Password</Label>
//                             <Input
//                                 id="password"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                                 placeholder="Enter password"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <DialogFooter>
//                         <Button type="button" variant="outline" onClick={handleCancel}>
//                             Cancel
//                         </Button>
//                         <Button type="submit">Submit</Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }
//
// export default CreateUserForm
//
//
"use client"

import React, { useState } from "react"
import { User } from "./columns"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"

interface CreateUserFormProps {
    isDialogOpen?: boolean
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
                                                           isDialogOpen,
                                                           setIsDialogOpen,
                                                           setUsers,
                                                       }) => {
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isLoading) return

        setIsLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/create_user`, formData)

            const usersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
            setUsers(usersResponse.data)

            alert("User created successfully!")
            setIsDialogOpen(false)
            setFormData({ username: "", email: "", role: "", password: "" })
        } catch (error) {
            console.error("Failed to create user:", error)
            alert("Failed to create user. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        if (isLoading) return
        setIsDialogOpen(false)
        setFormData({ username: "", email: "", role: "", password: "" })
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className={undefined}>
                    <DialogTitle className={undefined}>Create New User</DialogTitle>
                    <DialogDescription className={undefined}>
                        Fill in the details to create a new user account.
                    </DialogDescription>
                </DialogHeader>

                {/* Anti-autofill: form-level + inputs */}
                <form onSubmit={handleSubmit} autoComplete="off">
                    {/* Optional: a11y + helps some browsers */}
                    <input type="text" name="fake-username" autoComplete="username" className="hidden" />
                    <input type="password" name="fake-password" autoComplete="current-password" className="hidden" />

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className={undefined}>Username</Label>
                            <Input
                                id="username"
                                name="new-username"
                                autoComplete="off"
                                value={formData.username}
                                onChange={(e: { target: { value: string } }) => setFormData({...formData, username: e.target.value})}
                                placeholder="Enter username"
                                required
                                disabled={isLoading} className={undefined} type={undefined}                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className={undefined}>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                value={formData.email}
                                onChange={(e: { target: { value: string } }) => setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                                placeholder="Enter email"
                                required
                                disabled={isLoading} className={undefined}                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role" className={undefined}>Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: string) => setFormData({ ...formData, role: value })}
                                disabled={isLoading}
                            >
                                <SelectTrigger className={undefined}>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent className={undefined}>
                                    <SelectItem value="user" className={undefined}>User</SelectItem>
                                    <SelectItem value="admin" className={undefined}>Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className={undefined}>Password</Label>
                            <Input
                                id="password"
                                name="new-password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={(e: { target: { value: string } }) => setFormData({...formData, password: e.target.value})}
                                placeholder="Enter password"
                                required
                                disabled={isLoading} className={undefined}                            />
                        </div>
                    </div>

                    <DialogFooter className={undefined}>
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading} className={undefined}>

                            Cancel
                        </Button>

                        <Button type="submit" disabled={isLoading} className={undefined}>
                            {isLoading ? "...loading" : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateUserForm
