import React from "react";
import { Link } from "react-router-dom";
import "./Css/Invoices.css"

const Invoices = ()=>{
  return(
    <div className="InvoicesContianer">
      <h1>إدارة الفواتير</h1>
      <ul>
        <li><Link to="/admin/dashboard/invoices/create">إنشاء رابط دفع</Link></li>
        <li><Link to="/admin/dashboard/invoices/all">روابط الدفع</Link></li>
      </ul>
    </div>
  )
}

export default Invoices;