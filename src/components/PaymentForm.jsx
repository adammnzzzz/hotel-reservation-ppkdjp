import React, { useState } from "react";

const PaymentForm = ({ data, onBack, onSubmit }) => {
  // Local state biar inputnya enteng
  const [payment, setPayment] = useState({
    card_number: data?.card_number || "",
    card_holder_name: data?.card_holder_name || "",
    card_type: data?.card_type || "",
    expired_card: data?.expired_card || "",
    bank_transfer_to: data?.bank_transfer_to || "Mandiri Account",
    safety_box: data?.safety_box || "",
  });

  // --- TEMPAT NARUH LOGIC LO, LAN! ---
  const handleProcessPayment = (e) => {
    e.preventDefault();

    // Contoh Logic: Validasi sederhana nomor kartu
    if (payment.card_number && payment.card_number.length < 16) {
      alert("Nomor kartu kayaknya kurang lengkap, Lan!");
      return;
    }

    // Kalau lo mau tambah logic API Bank atau Midtrans, taruh di sini
    console.log("Processing payment logic for:", payment.card_holder_name);

    // Kirim data balik ke parent (ReservationWizard)
    onSubmit(payment);
  };

  const labelStyle =
    "block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1";
  const inputStyle =
    "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-slate-800 placeholder:text-slate-300";

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Header Form */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-200 mb-4 text-2xl">
          💳
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
          Payment Guarantee
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-2">
          Secure your reservation with payment details
        </p>
      </div>

      <form onSubmit={handleProcessPayment} className="space-y-6">
        {/* Input Card Number */}
        <div className="bg-white p-2">
          <label className={labelStyle}>Credit Card Number</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="0000 0000 0000 0000"
            value={payment.card_number}
            onChange={(e) =>
              setPayment({ ...payment, card_number: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Expiry Date</label>
            <input
              type="text"
              className={inputStyle}
              placeholder="MM / YY"
              value={payment.expired_card}
              onChange={(e) =>
                setPayment({ ...payment, expired_card: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelStyle}>Card Type</label>
            <select
              className={inputStyle}
              value={payment.card_type}
              onChange={(e) =>
                setPayment({ ...payment, card_type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="JCB">JCB</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelStyle}>Card Holder Name</label>
          <input
            type="text"
            className={`${inputStyle} uppercase`}
            placeholder="NAME AS PRINTED ON CARD"
            value={payment.card_holder_name}
            onChange={(e) =>
              setPayment({ ...payment, card_holder_name: e.target.value })
            }
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-4">
          <button
            type="button"
            onClick={() => onBack(payment)}
            className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            ← Data Tamu
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-2xl bg-[#0F172A] text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 shadow-2xl shadow-indigo-100 transition-all"
          >
            Selesaikan Reservasi
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
