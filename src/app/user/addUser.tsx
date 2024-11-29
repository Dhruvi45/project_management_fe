import axios from "axios";
import { UserFormInputs } from "./page";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "src/components/Loader";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

interface IRoleList {
    _id: string,
    name: string
}


export default function AddUser({
    isOpen,
    onClose,
}: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState<IRoleList[]>([]);
    useEffect(() => {
        test();
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormInputs>();
    console.log("is", isOpen);
    const onSubmit = (data: UserFormInputs) => {
        console.log("Form Data:", data);

    };
    if (!isOpen) return null;
    const test = async () => {
        setLoading(true);
        console.log("test", process.env.NEXT_PUBLIC_APP_BASE_URL);
        console.log("process.env.APP_BASE_URL+", process.env.NEXT_PUBLIC_APP_BASE_URL + "roles/list");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}roles/list`);
        setRoleList(response.data.data);
        setLoading(false);
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                {loading ? <Loader /> :

                    <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg h-66 overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4">
                            <h2 className="text-lg font-semibold">Add User</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        {/* Body */}
                        <div className="p-4">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="max-w-md mx-auto space-y-2"
                            >
                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="Enter your name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p
                                        className={`text-xs text-red-500 mt-1 min-h-[1rem] ${errors.name ? "visible" : "invisible"
                                            }`}
                                    >
                                        {errors.name?.message}
                                    </p>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: /^\S+@\S+$/i,
                                        })}
                                        placeholder="Enter your email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p
                                        className={`text-xs text-red-500 mt-1 min-h-[1rem] ${errors.email ? "visible" : "invisible"
                                            }`}
                                    >
                                        {errors.email?.message || "Invalid email"}
                                    </p>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: 6,
                                        })}
                                        placeholder="Enter your password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p
                                        className={`text-xs text-red-500 mt-1 min-h-[1rem] ${errors.password ? "visible" : "invisible"
                                            }`}
                                    >
                                        {errors.password?.message ||
                                            "Password must be at least 6 characters"}
                                    </p>
                                </div>

                                {/* Role Field */}
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        {...register("role", { required: "Role is required" })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Select a role</option>
                                        {roleList?.length > 0 && roleList.map((role: IRoleList, index: number) => {
                                            return (
                                                <option value={role._id} key={index}>{role.name}</option>
                                            );
                                        })}
                                    </select>
                                    <p
                                        className={`text-xs text-red-500 mt-1 min-h-[1rem] ${errors.role ? "visible" : "invisible"
                                            }`}
                                    >
                                        {errors.role?.message}
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Submit
                                </button>
                            </form></div>
                    </div>
                }
            </div>
        </>
    );
}
