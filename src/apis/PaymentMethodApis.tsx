// import React from "react";
import axios from "axios";

interface PaymentMethod { 
    Id: string;
    CardBrand: string;
    CardName: string;
}

const GetAllPaymentMethod = async (): Promise<PaymentMethod[]> => {
    try {
        const res = await axios.get<PaymentMethod[]>(
            "http://localhost:5000/api/GetAllPaymentMethod"
        )
        return res.data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

const CreatePaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.post<PaymentMethod>(
            "http://localhost:5000/api/PaymentMethod/CreatePaymentMethod"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdatePaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.post<PaymentMethod>(
            "http://localhost:5000/api/PaymentMethod/UpdatePaymentMethod"
        )
    } catch (err) {
        console.error(err)
    }
}

const DeletePaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.delete<string>( // Send the id
            "http://localhost:5000/api/PaymentMethod/DeletePaymentMethod"
        )
    } catch (err) {
        console.error(err)
    }
}