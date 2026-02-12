// import React from "react";
import axios from "axios";

interface HelloResponse { 
    //TODO: change it to match PaymentMethod class "intity"
    message: string;
}

const GetAllPaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.get<HelloResponse>(
            "http://localhost:5000/api/GetAllPaymentMethod"
        )
        
    } catch (err) {
        console.error(err)
    }
}

const CreatePaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
            "http://localhost:5000/api/PaymentMethod/CreatePaymentMethod"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdatePaymentMethod = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
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