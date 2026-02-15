// import React from "react";
import axios from "axios";

interface Payment { 
    Id: string;
    InvoiceId: string;
    Amount: number;
    CreatedAt: string;
    Currency: string;
}

const GetAllPayments = async (): Promise<Payment[]> => {
    try {
        const res = await axios.get<Payment[]>(
            "http://localhost:5000/api/GetAllPayments"
        )
        return res.data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

const CreatePayment = async (): Promise<void> => {
    try {
        const res = await axios.post<Payment>(
            "http://localhost:5000/api/Payment/CreatePayment"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdatePayment = async (): Promise<void> => {
    try {
        const res = await axios.post<Payment>(
            "http://localhost:5000/api/Payment/UpdatePayment"
        )
    } catch (err) {
        console.error(err)
    }
}

const DeletePayment = async (): Promise<void> => {
    try {
        const res = await axios.delete<string>( // Send the id
            "http://localhost:5000/api/Payment/DeletePayment"
        )
    } catch (err) {
        console.error(err)
    }
}