import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";
import "../Css/Contact.css";

function Contact() {
  const {t, i18n} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const validateForm = (formData) => {
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !message || !phone) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address!",
        icon: "error",
      });
      return false;
    }
    const phoneRegex = /^\+\d{1,20}$/; // Adjust the length as needed
    if (!phoneRegex.test(phone)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid phone number starting with +Country_Code ex:(+966) and without spaces",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Validate Form Data
    if (!validateForm(formData)) {
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      Swal.fire({
        title: "Wait!",
        text: "You can only submit once per session.",
        icon: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    formData.append("access_key", "eb46d82d-a1d7-483d-9ef3-2227c7971289");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
        });

        setTimeout(() => {
          navigate("/"); // Replace "/" with your homepage route
        }, 4000); 
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false); // Re-enable the form
    }
  };

  return (
    <section className="FormSection">
      <form onSubmit={onSubmit}>
        <h1>{t('ContactUsHeader')}</h1>
        <div className="input-box">
          <label>{t('ContactUsFullNameInput')}</label>
          <input placeholder={t('ContactUsNamePlaceHolder')} type="text" name="name" required />
        </div>
        <div className="input-box">
          <label>{t('ContactUsPhoneNumberInput')}</label>
          <input placeholder={t('ContactUsPhonePlaceHolder')} type="text" name="phone" required />
        </div>
        <div className="input-box">
          <label>{t('ContactUsEmailInput')}</label>
          <input placeholder={t('ContactUsEmailPlaceHolder')} type="email" name="email" required />
        </div>
        <div className="input-box">
          <label>{t('ContactUsYourMessageInput')}</label>
          <textarea name="message" placeholder={t('ContactUsMessagePlaceHolder')} required></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('ContactUsButtonSending') : t('ContactUsButtonSend')}
        </button>
      </form>
    </section>
  );
}

export default Contact;
