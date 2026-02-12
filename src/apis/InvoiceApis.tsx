// import React from "react";
import axios from "axios";

interface Invoice { 
    //TODO: change it to match invoice class "intity"
    message: string;
}

const fetchInvoices = async (): Promise<Invoice[]> => {
    try {
        const res = await axios.get<Invoice[]>(
            "http://localhost:5000/api/invoices"
        );
        return res.data; 
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

const DeleteInvoice = async (): Promise<void> => {
    try {
        const res = await axios.delete<string>( // Send the id
            "http://localhost:5000/api/invoice/DeleteInvoice"
        )
    } catch (err) {
        console.error(err)
    }
}