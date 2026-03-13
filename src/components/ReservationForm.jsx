import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import LogoImg from "../assets/img/logo.jpg";
// IMPORT LIBRARY PHONE
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const ReservationForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    room_no: "",
    num_of_person: "",
    num_of_room: "",
    room_type: "Standard",
    guest_name: "",
    profession: "",
    company: "",
    nationality: "",
    id_number: "",
    birth_date: "",
    address: "",
    phone: "",
    email: "",
    arrival_date: "",
    arrival_time: "",
    departure_date: "",
    member_no: "",
    safety_box: "",
    issued_by: "",
    card_number: "",
    card_holder_name: "",
    card_type: "",
    expired_card: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...form,
      arrival_date: form.arrival_date || null,
      arrival_time: form.arrival_time || null, // <--- INI OBATNYA, LAN!
      departure_date: form.departure_date || null,
      birth_date: form.birth_date || null,
      num_of_person: parseInt(form.num_of_person) || null,
      num_of_room: parseInt(form.num_of_room) || null,
    };

    const { data, error } = await supabase
      .from("reservations")
      .insert([finalData])
      .select();

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Reservasi Berhasil Disimpan!");
      if (onSuccess) onSuccess(data[0]);
    }
  };

  const inputStyle =
    "w-full bg-transparent border-b border-slate-300 py-2 outline-none focus:border-indigo-600 transition-all font-semibold text-slate-800 placeholder:text-slate-300 text-sm";
  const labelStyle =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";
  const sectionTitle =
    "text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 after:content-[''] after:h-px after:bg-slate-100 after:flex-1";

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
      <div className="flex flex-col items-center mb-12 text-center">
        <img
          src={LogoImg}
          alt="Logo"
          className="w-20 h-20 object-contain mb-4 rounded-2xl shadow-lg"
        />
        <h1 className="text-2xl font-black tracking-[0.2em]">PPKD HOTEL</h1>
        <p className="text-xs font-bold text-slate-400 italic">
          Formulir Pendaftaran / Registration Form
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SECTION 1: ROOM ASSIGNMENT */}
        <section>
          <h3 className={sectionTitle}>I. Room Assignment</h3>
          <div className="grid grid-cols-12 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="col-span-4 border-r border-b border-slate-200 p-4 bg-slate-50/50">
              <label className={labelStyle}>Room No.</label>
              <input
                type="text"
                className={inputStyle}
                placeholder="0601"
                value={form.room_no}
                onChange={(e) => setForm({ ...form, room_no: e.target.value })}
              />
            </div>
            <div className="col-span-4 border-r border-b border-slate-200 p-4">
              <label className={labelStyle}>No. of Person</label>
              <input
                type="number"
                className={inputStyle}
                value={form.num_of_person}
                onChange={(e) =>
                  setForm({ ...form, num_of_person: e.target.value })
                }
              />
            </div>
            <div className="col-span-4 border-b border-slate-200 p-4">
              <label className={labelStyle}>Receptionist</label>
              <input
                type="text"
                className={inputStyle}
                value={form.issued_by}
                onChange={(e) =>
                  setForm({ ...form, issued_by: e.target.value })
                }
              />
            </div>
            <div className="col-span-4 border-r border-slate-200 p-4">
              <label className={labelStyle}>No. of Room</label>
              <input
                type="number"
                className={inputStyle}
                value={form.num_of_room}
                onChange={(e) =>
                  setForm({ ...form, num_of_room: e.target.value })
                }
              />
            </div>
            <div className="col-span-8 p-4 bg-indigo-50/20">
              <label className={labelStyle}>Room Type</label>
              <select
                className={inputStyle}
                value={form.room_type}
                onChange={(e) =>
                  setForm({ ...form, room_type: e.target.value })
                }
              >
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 2: GUEST DETAILS */}
        <section>
          <h3 className={sectionTitle}>II. Guest Details</h3>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <label className={labelStyle}>Full Name / Nama</label>
              <input
                type="text"
                required
                className={inputStyle + " text-base uppercase"}
                placeholder="PRINT IN BLOCK LETTERS"
                value={form.guest_name}
                onChange={(e) =>
                  setForm({ ...form, guest_name: e.target.value })
                }
              />
            </div>

            <div className="col-span-6">
              <label className={labelStyle}>Profession / Pekerjaan</label>
              <input
                type="text"
                className={inputStyle}
                value={form.profession}
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
              />
            </div>
            <div className="col-span-6">
              <label className={labelStyle}>Company / Perusahaan</label>
              <input
                type="text"
                className={inputStyle}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>

            {/* --- INPUT TELEPON DENGAN KODE NEGARA --- */}
            <div className="col-span-6">
              <label className={labelStyle}>Telephone / Handphone</label>
              <div className="border-b border-slate-300 transition-all focus-within:border-indigo-600">
                <PhoneInput
                  international
                  defaultCountry="ID"
                  value={form.phone}
                  onChange={(val) => setForm({ ...form, phone: val })}
                  className="elegant-phone-input"
                />
              </div>
            </div>

            <div className="col-span-6">
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                className={inputStyle}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="col-span-4">
              <label className={labelStyle}>Nationality</label>
              <input
                type="text"
                className={inputStyle}
                value={form.nationality}
                onChange={(e) =>
                  setForm({ ...form, nationality: e.target.value })
                }
              />
            </div>
            <div className="col-span-4">
              <label className={labelStyle}>ID / Passport No.</label>
              <input
                type="text"
                className={inputStyle}
                value={form.id_number}
                onChange={(e) =>
                  setForm({ ...form, id_number: e.target.value })
                }
              />
            </div>
            <div className="col-span-4">
              <label className={labelStyle}>Birth Date</label>
              <input
                type="date"
                className={inputStyle}
                value={form.birth_date}
                onChange={(e) =>
                  setForm({ ...form, birth_date: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: DEPOSIT & PAYMENT */}
        <section>
          <h3 className={sectionTitle}>III. Deposit & Guarantee</h3>
          <div className="grid grid-cols-12 gap-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
            <div className="col-span-6 md:col-span-4">
              <label className={labelStyle}>Arrival Date</label>
              <input
                type="date"
                className={inputStyle}
                value={form.arrival_date}
                onChange={(e) =>
                  setForm({ ...form, arrival_date: e.target.value })
                }
              />
            </div>
            <div className="col-span-6 md:col-span-4">
              <label className={labelStyle}>Departure Date</label>
              <input
                type="date"
                className={inputStyle}
                value={form.departure_date}
                onChange={(e) =>
                  setForm({ ...form, departure_date: e.target.value })
                }
              />
            </div>
            <div className="col-span-12 md:col-span-4 text-rose-500 font-bold text-[9px] uppercase flex items-end pb-2 italic">
              * Standard Check Out 12.00 Noon
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className={labelStyle}>Credit Card Number</label>
              <input
                type="text"
                className={inputStyle}
                placeholder="xxxx xxxx xxxx xxxx"
                value={form.card_number}
                onChange={(e) =>
                  setForm({ ...form, card_number: e.target.value })
                }
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className={labelStyle}>Expiry Date (MM/YY)</label>
              <input
                type="text"
                className={inputStyle}
                placeholder="09/28"
                value={form.expired_card}
                onChange={(e) =>
                  setForm({ ...form, expired_card: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-[#0F172A] text-white font-black py-6 rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-2xl shadow-indigo-200 uppercase tracking-[0.3em] text-xs"
        >
          Confirm Reservation & Save to Cloud
        </button>
      </form>

      {/* CSS KHUSUS BUAT PHONE INPUT BIAR ELEGAN */}
      <style>{`
        .elegant-phone-input {
          display: flex;
          align-items: center;
        }
        .PhoneInputInput {
          border: none !important;
          outline: none !important;
          font-weight: 600;
          font-size: 0.875rem;
          color: #1e293b;
          padding: 0.5rem 0;
          background: transparent;
          width: 100%;
        }
        .PhoneInputCountry {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default ReservationForm;
