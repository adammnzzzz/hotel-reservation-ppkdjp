import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import LogoImg from "../assets/img/logo.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { showLoading, showAlert, closeSwal } from "../utils/swalCustom";

// 1. DATA MASTER KAMAR (Business Rules)
const ROOM_DATA = {
  Standard: {
    rooms: ["101", "102", "103", "104", "105"],
    price: 500000,
    max_pax: 2,
  },
  Deluxe: { rooms: ["201", "202", "203", "204"], price: 850000, max_pax: 3 },
  Suite: { rooms: ["301", "302"], price: 1500000, max_pax: 4 },
  Penthouse: { rooms: ["0601", "0602"], price: 3500000, max_pax: 6 },
};

const ReservationForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    room_no: "", // Akan berisi string dipisah koma, misal: "101, 102"
    num_of_person: "1",
    num_of_room: "1",
    room_type: "Standard",
    room_price: 500000,
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
    card_type: "Visa",
    expired_card: "",
    notes: "",
  });

  // 2. LOGIC: PILIH NOMOR KAMAR DINAMIS (BISA MULTI)
  const handleRoomSelect = (no) => {
    let selectedRooms = form.room_no
      ? form.room_no.split(", ").filter((r) => r !== "")
      : [];
    const limit = parseInt(form.num_of_room) || 1;

    if (selectedRooms.includes(no)) {
      // Jika sudah ada, hapus (Toggle Off)
      selectedRooms = selectedRooms.filter((r) => r !== no);
    } else {
      // Jika belum ada, cek apakah sudah mencapai limit No. of Room
      if (selectedRooms.length < limit) {
        selectedRooms.push(no);
      } else {
        showAlert(
          "info",
          "Limit Tercapai",
          `Hapus kamar lain dulu jika ingin memilih kamar ${no}, Lan.`,
        );
      }
    }
    setForm({ ...form, room_no: selectedRooms.join(", ") });
  };

  // 3. LOGIC: VALIDASI KAPASITAS (PAX)
  const handlePaxChange = (val) => {
    const max = ROOM_DATA[form.room_type].max_pax;
    if (parseInt(val) > max) {
      showAlert(
        "warning",
        "Over Capacity!",
        `Kamar ${form.room_type} maksimal cuma untuk ${max} orang per unit.`,
      );
      setForm({ ...form, num_of_person: max.toString() });
    } else {
      setForm({ ...form, num_of_person: val });
    }
  };

  // 4. LOGIC: SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: Apakah jumlah kamar yang diklik sama dengan No. of Room?
    const selectedCount = form.room_no ? form.room_no.split(", ").length : 0;
    if (selectedCount !== parseInt(form.num_of_room)) {
      showAlert(
        "error",
        "Kamar Belum Lengkap",
        `Lo harus pilih ${form.num_of_room} nomor kamar, baru bisa simpan.`,
      );
      return;
    }

    showLoading("Menyimpan Reservasi...", "Mohon tunggu sebentar.");

    const finalData = {
      ...form,
      arrival_date: form.arrival_date || null,
      arrival_time: form.arrival_time || null,
      departure_date: form.departure_date || null,
      birth_date: form.birth_date || null,
      num_of_person: parseInt(form.num_of_person) || null,
      num_of_room: parseInt(form.num_of_room) || null,
      room_price: ROOM_DATA[form.room_type].price * parseInt(form.num_of_room),
    };

    const { data, error } = await supabase
      .from("reservations")
      .insert([finalData])
      .select();
    closeSwal();

    if (error) {
      showAlert("error", "Gagal!", error.message);
    } else {
      showAlert("success", "Berhasil!", "Data tersimpan aman.").then(() => {
        if (onSuccess) onSuccess(data[0]);
      });
    }
  };

  const inputStyle =
    "w-full bg-transparent border-b border-slate-300 py-2 outline-none focus:border-indigo-600 transition-all font-semibold text-slate-800 text-sm";
  const labelStyle =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";
  const sectionTitle =
    "text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 after:content-[''] after:h-px after:bg-slate-100 after:flex-1";

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
      <div className="flex flex-col items-center mb-12 text-center">
        <img
          src={LogoImg}
          alt="Logo"
          className="w-20 h-20 object-contain mb-4 rounded-2xl shadow-lg"
        />
        <h1 className="text-2xl font-black tracking-[0.2em]">PPKD HOTEL</h1>
        <p className="text-xs font-bold text-slate-400 italic font-mono uppercase tracking-widest">
          Registration System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SECTION I: ROOM ASSIGNMENT */}
        <section>
          <h3 className={sectionTitle}>I. Room Assignment</h3>
          <div className="grid grid-cols-12 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="col-span-12 md:col-span-4 border-r border-b border-slate-100 p-6 bg-slate-50/50">
              <label className={labelStyle}>Room Type</label>
              <select
                className={inputStyle}
                value={form.room_type}
                onChange={(e) => {
                  const type = e.target.value;
                  setForm({
                    ...form,
                    room_type: type,
                    room_no: "",
                    room_price: ROOM_DATA[type].price,
                  });
                }}
              >
                {Object.keys(ROOM_DATA).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-6 md:col-span-4 border-r border-b border-slate-100 p-6">
              <label className={labelStyle}>No. of Room (Units)</label>
              <input
                type="number"
                min="1"
                className={inputStyle}
                value={form.num_of_room}
                onChange={(e) =>
                  setForm({ ...form, num_of_room: e.target.value, room_no: "" })
                }
              />
            </div>

            <div className="col-span-6 md:col-span-4 border-b border-slate-100 p-6 bg-emerald-50/20">
              <label className={labelStyle}>Calculated Total</label>
              <div className="py-2 text-base font-black text-emerald-600">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(
                  ROOM_DATA[form.room_type].price *
                    (parseInt(form.num_of_room) || 1),
                )}
              </div>
            </div>

            {/* SELEKSI NOMOR KAMAR INTERAKTIF */}
            <div className="col-span-12 p-8 bg-white">
              <label className={labelStyle}>
                Select {form.num_of_room} Room(s):
              </label>
              <div className="flex flex-wrap gap-3 mt-4">
                {ROOM_DATA[form.room_type].rooms.map((no) => {
                  const isSelected = form.room_no.split(", ").includes(no);
                  return (
                    <button
                      key={no}
                      type="button"
                      onClick={() => handleRoomSelect(no)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                        isSelected
                          ? "bg-[#0F172A] border-[#0F172A] text-white shadow-lg scale-105"
                          : "bg-white border-slate-200 text-slate-400 hover:border-indigo-400"
                      }`}
                    >
                      {no}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Selected Room Numbers:
                </p>
                <p className="text-sm font-black text-indigo-600 mt-1">
                  {form.room_no || "Please select room(s) above..."}
                </p>
              </div>
            </div>

            <div className="col-span-4 border-t border-r border-slate-100 p-6">
              <label className={labelStyle}>
                Pax (Max/Unit: {ROOM_DATA[form.room_type].max_pax})
              </label>
              <input
                type="number"
                min="1"
                className={inputStyle}
                value={form.num_of_person}
                onChange={(e) => handlePaxChange(e.target.value)}
              />
            </div>
            <div className="col-span-8 border-t border-slate-100 p-6">
              <label className={labelStyle}>Receptionist Name</label>
              <input
                type="text"
                className={inputStyle}
                placeholder="Full Name"
                value={form.issued_by}
                onChange={(e) =>
                  setForm({ ...form, issued_by: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* SECTION II: GUEST DETAILS */}
        <section>
          <h3 className={sectionTitle}>II. Guest Details</h3>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
              <label className={labelStyle}>Full Name / Nama Tamu</label>
              <input
                type="text"
                required
                className={inputStyle + " text-base uppercase"}
                placeholder="EX: LAN ORLANDO"
                value={form.guest_name}
                onChange={(e) =>
                  setForm({ ...form, guest_name: e.target.value })
                }
              />
            </div>
            <div className="col-span-12 md:col-span-4">
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

            <div className="col-span-6 md:col-span-4">
              <label className={labelStyle}>Telephone / HP</label>
              <PhoneInput
                international
                defaultCountry="ID"
                value={form.phone}
                onChange={(val) => setForm({ ...form, phone: val })}
                className="elegant-phone-input"
              />
            </div>
            <div className="col-span-6 md:col-span-4">
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                className={inputStyle}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
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
          </div>
        </section>

        {/* SECTION III: DEPOSIT & PAYMENT */}
        {/* SECTION III: DEPOSIT & PAYMENT */}
        <section>
          <h3 className={sectionTitle}>III. Deposit & Guarantee</h3>

          {/* BOX INFO BANK MANDIRI (TAMBAHKAN INI) */}
          <div className="bg-indigo-900 text-white p-6 rounded-t-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg gap-4">
            <div>
              <p className="text-[9px] font-bold opacity-60 uppercase tracking-[0.2em]">
                Or by Bank Transfer to:
              </p>
              <h4 className="text-lg font-black tracking-tight mt-1 underline underline-offset-4">
                Mandiri Account : 123-00-9999-888
              </h4>
            </div>
            <div className="md:text-right">
              <p className="text-[9px] font-bold opacity-60 uppercase tracking-[0.2em]">
                Mandiri Name Account
              </p>
              <p className="text-sm font-bold mt-1 uppercase">
                PPKD HOTEL JAKARTA
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-b-[2rem] border border-slate-200 border-t-0 space-y-10">
            <p className="text-[11px] font-bold text-slate-500 italic">
              Reservation guaranteed by the following credit card:
            </p>

            <div className="grid grid-cols-12 gap-8">
              {/* CARD NUMBER */}
              <div className="col-span-12 md:col-span-6">
                <label className={labelStyle}>Card Number</label>
                <input
                  type="text"
                  placeholder="123124124124123"
                  className={inputStyle}
                  value={form.card_number}
                  onChange={(e) =>
                    setForm({ ...form, card_number: e.target.value })
                  }
                />
              </div>

              {/* CARD HOLDER NAME */}
              <div className="col-span-12 md:col-span-6">
                <label className={labelStyle}>Card Holder Name</label>
                <input
                  type="text"
                  placeholder="AS PRINTED ON CARD"
                  className={inputStyle}
                  value={form.card_holder_name}
                  onChange={(e) =>
                    setForm({ ...form, card_holder_name: e.target.value })
                  }
                />
              </div>

              {/* CARD TYPE */}
              <div className="col-span-4">
                <label className={labelStyle}>Card Type</label>
                <select
                  className={inputStyle}
                  value={form.card_type}
                  onChange={(e) =>
                    setForm({ ...form, card_type: e.target.value })
                  }
                >
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>JCB</option>
                  <option>Amex</option>
                </select>
              </div>

              {/* EXPIRED DATE */}
              <div className="col-span-4">
                <label className={labelStyle}>Expired date/month/year</label>
                <input
                  type="text"
                  placeholder="09/28"
                  className={inputStyle}
                  value={form.expired_card}
                  onChange={(e) =>
                    setForm({ ...form, expired_card: e.target.value })
                  }
                />
              </div>

              {/* SIGNATURE LINE (TANDA TANGAN) */}
              <div className="col-span-4 flex flex-col justify-end items-center border-l border-slate-200 pl-4">
                <div className="w-full h-px bg-slate-400 mt-6 mb-1"></div>
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-tighter italic">
                  Card holder signature
                </label>
              </div>
            </div>

            {/* ARRIVAL & DEPARTURE DATE (Pindahkan ke bawah kartu) */}
            <div className="grid grid-cols-12 gap-6 pt-6 border-t border-slate-200">
              <div className="col-span-6 md:col-span-4">
                <label className={labelStyle}>Arrival Date</label>
                <input
                  type="date"
                  required
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
              <div className="col-span-12 md:col-span-4 flex items-end">
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  Check Out: 12.00 PM
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="col-span-12">
              <label className={labelStyle}>Special Requests / Notes</label>
              <textarea
                className="w-full bg-transparent border-b border-slate-300 py-2 outline-none focus:border-indigo-600 transition-all text-sm h-12 resize-none"
                placeholder="Ex: Smoking Room, Extra Towels..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-[#0F172A] text-white font-black py-6 rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-2xl shadow-indigo-100 uppercase tracking-[0.4em] text-[10px]"
        >
          Confirm Reservation & Save to Cloud
        </button>
      </form>

      <style>{`
        .elegant-phone-input { display: flex; align-items: center; border-bottom: 1px solid #cbd5e1; }
        .PhoneInputInput { border: none !important; outline: none !important; font-weight: 600; font-size: 0.875rem; color: #1e293b; padding: 0.5rem 0; background: transparent; width: 100%; }
        .PhoneInputCountry { margin-right: 10px; }
      `}</style>
    </div>
  );
};

export default ReservationForm;
