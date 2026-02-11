// import React from "react";
import axios from "axios";

interface HelloResponse { 
    //TODO: change it to match invoice class "intity"
    message: string;
}

const GetAllInvoices = async (): Promise<void> => {
    try {
        const res = await axios.get<HelloResponse>(
            "http://localhost:5000/api/GetAllInvoices"
        )
        
    } catch (err) {
        console.error(err)
    }
}

const CreateInvoice = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
            "http://localhost:5000/api/invoice/CreateInvoice"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdateInvoice = async (): Promise<void> => {
    try {
        const res = await axios.post<HelloResponse>(
            "http://localhost:5000/api/invoice/UpdateInvoice"
        )
    } catch (err) {
        console.error(err)
    }
}