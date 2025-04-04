import React, { useState, useEffect } from "react";
import './Css/CreateInvoice.css';

const Invoices = () => {
  const [hotels, setHotels] = useState([]);
  const [paymentLink, setPaymentLink] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerNumber: "",
    customerEmail: "",
    hotel: "",
    nights: "",
    pricePerNight: "",
    totalAmount: 0,
  });

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hotels", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  // Calculate total price
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalAmount: prev.nights * prev.pricePerNight,
    }));
  }, [formData.nights, formData.pricePerNight]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create payment link
  const handleCreateInvoice = async () => {
    try {
        // Generate payment link
        const paymentResponse = await fetch("http://localhost:5000/api/payments/create-payment-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                invoiceId: Date.now().toString(), // Generate a unique invoice ID
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                customerNumber: formData.customerNumber,
                totalAmount: formData.totalAmount,
                notificationType: formData.notificationType, // Use EMAIL only for now
            }),
        });

        const paymentData = await paymentResponse.json();

        // Check if the payment link was generated successfully
        if (!paymentData.success) {
            throw new Error(paymentData.error || "Failed to generate payment link");
        }

        // Save invoice details to the database
        const invoiceResponse = await fetch("http://localhost:5000/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                customerName: formData.customerName,
                customerNumber: formData.customerNumber,
                email: formData.customerEmail,
                hotel: formData.hotel,
                nights: formData.nights,
                pricePerNight: formData.pricePerNight,
                paymentLink: paymentData.paymentLink,
                paymentLinkId: paymentData.paymentLinkId,
            }),
        });

        const invoiceData = await invoiceResponse.json();

        // Check if the invoice was saved successfully
        if (!invoiceResponse.ok) {
            throw new Error(invoiceData.message || "Failed to create invoice");
        }

        // Update the UI
        setPaymentLink(paymentData.paymentLink);
        alert("Invoice created and payment link generated successfully!");
    } catch (error) {
        console.error("Error creating invoice:", error);
        alert(error.message);
    }
};

  return (
    <div className="CreateInvoiceContianer">
      <h1>إنشاء رابط دفع</h1>
      <input type="text" name="customerName" placeholder="اسم العميل" onChange={handleChange} />
      <input type="text" name="customerNumber" placeholder="رقم العميل , يبدا ب 00 ثم مفتاح الدولة , لا تستخدم +" onChange={handleChange} />
      <input type="email" name="customerEmail" placeholder="ايميل العميل" onChange={handleChange} />
      <select name="hotel" onChange={handleChange}>
        <option>Select Hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel._id} value={hotel._id}>
            {hotel.hotelName.ar}
          </option>
        ))}
      </select>
      <input type="number" name="nights" placeholder="عدد الليالي" onChange={handleChange} />
      <input type="number" name="pricePerNight" placeholder="سعر الليلة" onChange={handleChange} />
      <h3>المجموع: {formData.totalAmount}</h3>
      <button onClick={handleCreateInvoice}>أنشئ رابط دفع</button>

      {paymentLink && (
        <div className="GeneratedLinkDiv">
            <h3>رابط الدفع:</h3>
            <div>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                  {paymentLink}
              </a>
              <button onClick={() => navigator.clipboard.writeText(paymentLink)}>
                  انسخ الرابط
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;