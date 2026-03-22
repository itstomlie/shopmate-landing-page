import React, { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import "./WishlistForm.css";

type WishlistFormProps = {
  variant?: "default" | "on-dark";
  placeholder?: string;
  buttonLabel?: string;
};

const WishlistForm: React.FC<WishlistFormProps> = ({
  variant = "default",
  placeholder = "Enter your email for the wishlist",
  buttonLabel = "Join Wishlist",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleWishlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setIsError(true);
      setStatusMessage(
        "Wishlist is not configured yet. Please try again later.",
      );
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setStatusMessage("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: email.trim(),
          reply_to: email.trim(),
          to_email: "itstomlie@gmail.com",
          message: `Please add this email to the Shopmate wishlist: ${email.trim()}`,
        },
        {
          publicKey,
        },
      );

      setEmail("");
      setStatusMessage("Thanks! You are on the wishlist.");
    } catch {
      setIsError(true);
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`wishlist-signup wishlist-signup--${variant}`}>
      <form className="wishlist-form" onSubmit={handleWishlistSubmit}>
        <input
          className="wishlist-input"
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          className="wishlist-submit btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : buttonLabel}
        </button>
      </form>
      {statusMessage ? (
        <p
          className={`wishlist-status ${isError ? "error" : "success"}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
};

export default WishlistForm;
