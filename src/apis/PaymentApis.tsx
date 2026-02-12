// import React from "react";
import axios from "axios";

interface HelloResponse { 
    //TODO: change it to match Payment class "intity"
    message: string;
}

const GetAllPayments = async (): Promise<void> => {
    try {
        const res = await axios.get<HelloResponse>(
            "http://localhost:5000/api/GetAllPayments"
        )
        
    } catch (err) {
        console.error(err)
    }
}

const CreatePayment = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
            "http://localhost:5000/api/Payment/CreatePayment"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdatePayment = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
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