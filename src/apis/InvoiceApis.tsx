// import React from "react";
import axios from "axios";

export const InvoiceStatus = {
  Draft: 0,
  Sent: 1,
  Paid: 2,
  Overdue: 3,
  Cancelled: 4
} as const;

// 2. Extract the Type for cleaner usage
export type InvoiceStatusType = typeof InvoiceStatus[keyof typeof InvoiceStatus];

export interface Invoice { 
    Id: string;
    CompanyId: string;
    CreatedAt: string;
    IssueDate: string;
    DueDate: string;
    TotalAmount: number;
    AmountPaid: number;
    IsPaid: boolean;
    Status: InvoiceStatusType;
    client: string;
}

export const fetchInvoices = async (): Promise<Invoice[]> => {
    try {
        const res = await axios.get<Invoice[]>(
            "http://localhost:5000/api/invoices"
        );
        return res.data; 
    } catch (err) {
        console.error(err)
        throw err
    }
}

const CreateInvoice = async (): Promise<void> => {
    try {
        const res = await axios.post<Invoice>(
            "http://localhost:5000/api/invoice/CreateInvoice"
        )
    } catch (err) {
        console.error(err)
    }
}

const UpdateInvoice = async (): Promise<void> => {
    try {
        const res = await axios.post<Invoice>(
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