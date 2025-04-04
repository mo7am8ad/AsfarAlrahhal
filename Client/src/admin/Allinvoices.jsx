import React, { useEffect, useState } from "react";
import './Css/Allinvoices.css';

const Allinvoices = () => {
    const [invoices, setInvoices] = useState([]);

    // Function to fetch invoices from the backend
    const fetchInvoices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/invoices", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setInvoices(data);
            } else {
                throw new Error(data.message || "Failed to fetch invoices");
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
            alert(error.message);
        }
    };

    // Function to update payment status
    const updatePaymentStatus = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/invoices/update-payment-status", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update payment status");
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            alert(error.message); // Show the error message to the user
        }
    };

    // On page load, update payment status and fetch invoices
    useEffect(() => {
        const initializePage = async () => {
            try {
                await updatePaymentStatus(); // Update payment status
                await fetchInvoices(); // Fetch updated invoices
            } catch (error) {
                console.error("Error initializing page:", error);
                alert("Failed to initialize page. Please try again.");
            }
        };
        initializePage();
    }, []);

    return (
        <div className="AllinvoicesContianer">
            <h2>Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Hotel</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Payment Link</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice._id}</td>
                            <td>{invoice.customerName}</td>
                            <td>{invoice.email}</td>
                            <td>{invoice.hotel?.hotelName}</td>
                            <td>{invoice.totalAmount}</td>
                            <td>{invoice.paymentStatus}</td>
                            <td>
                                <a href={invoice.paymentLink} target="_blank" rel="noopener noreferrer">
                                    Payment Link
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Allinvoices;