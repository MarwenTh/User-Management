import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion"

const Table = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isUserDeleted, setIsUserInserted] = useState(false);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(data.length / recordsPerPage);
    const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users/");
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.log("Data fetch error: ", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    };

    useEffect(() => {
        fetchData();
    }, [isUserDeleted]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (date) => {
        return moment(date).format("MMMM Do YYYY, h:mm A");
    };

    const handleDelete = async (id, firstName, lastName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user ' + '"' + firstName + ' ' + lastName + '"' + '!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
            color: '#fff',
            background: '#21156e',
        }).then(async (results) => {
            if (results.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:4000/api/users/${id}`, {
                        method: "DELETE",
                    });
                    const json = await response.json();
                    if (json.success) {
                        fetchData();
                    } else {
                        console.log(json.message);
                    }
                } catch (error) {
                    console.log(error);
                }
                setIsUserInserted(true);
                Swal.fire("success", '"' + firstName + ' ' + lastName + '"' + "has been deleted successfully!", 'success');
            } else if (results.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The deletion process has been cancelled.', 'info');
            }
        });
    };

    const override = {
        display: "block",
        margin: " auto",
        borderColor: "red",
    };

    return (
        <div className="h-[calc(100vh-70px)]">
            {loading ?
                <ClipLoader
                    loading={loading}
                    cssOverride={override}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : (
                    <div>
                        <div className="flex justify-center">
                            <table className="w-2/3 text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
                                <thead className="text-xs text-[#9ca3a6] uppercase bg-[#374151]">
                                    <tr>
                                        <th className="px-6 py-3">First Name</th>
                                        <th className="px-6 py-3">Last Name</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Posting Date</th>
                                        <th colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((item) => (
                                        <tr
                                            className="bg-[#1f2937] border-b hover:bg-gray-600 transition-all ease-in-out h-14"
                                            key={item._id}
                                        >
                                            <td className="px-6">{item.name.firstName}</td>
                                            <td className="px-6">{item.name.lastName}</td>
                                            <td className="px-6">{item.email}</td>
                                            <td className="px-6">{formatDate(item.posting_date)}</td>
                                            <td className="px-6">
                                                <Link to={'/editUser'} className="text-blue-600 underline" onClick={''}>Edit</Link>
                                            </td>
                                            <td className="px-6">
                                                <Link
                                                    className="text-red-600 underline"
                                                    onClick={() => handleDelete(item._id, item.name.firstName, item.name.lastName)}
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <div className="fixed bottom-28">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === pageNumbers[0]}
                                    className="bg-blue-700 rounded-lg px-7 py-2 font-bold text-white hover:bg-blue-600 transition-all ease-in-out duration-300"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                                    className="bg-blue-700 rounded-lg px-7 py-2 font-bold text-white hover:bg-blue-600 transition-all ease-in-out duration-300 mx-4"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Table;
