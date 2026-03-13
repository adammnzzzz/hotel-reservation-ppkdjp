import React, { useState } from "react";
import InputField from "../components/InputField.jsx"; // Tambahin .jsx

const RegistrationForm = () => {
  // 1. Inisialisasi State sesuai kolom di foto formulir
  const [formData, setFormData] = useState({
    guestName: "",
    company: "",
    bookingNo: "",
    telp: "",
    email: "",
    date: "",
    arrivalDate: "",
    departureDate: "",
    roomType: "",
    totalNight: 0,
  });

  // 2. Fungsi sakti buat ambil inputan user secara dinamis
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Data yang akan disimpan ke Database:", formData);
    alert(`Reservasi atas nama ${formData.guestName} berhasil disiapkan!`);
    // Nanti di sini kita panggil fungsi dari Redux atau Axios
  };

  return (
    <div className="min-h-screen p-4 md:p-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl p-8 border-t-8 border-blue-700">
        {/* Header & Info (Tetap sama kayak sebelumnya) */}
        <div className="flex justify-between items-start border-b-2 border-gray-100 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-blue-800">
              PPKD HOTEL
            </h1>
          </div>
          <div className="text-right uppercase">
            <h2 className="text-xl font-bold underline">
              Reservation Confirmation
            </h2>
          </div>
        </div>

        {/* Input Bagian Atas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <InputField
              label="To."
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Guest Name"
            />
            <InputField
              label="Company / Agent"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <InputField
              label="Booking No."
              name="bookingNo"
              value={formData.bookingNo}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <InputField
              label="Telp / Fax"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Detail Kamar */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="font-bold mb-4 border-b pb-2 text-blue-700 uppercase text-sm">
            Room Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Arrival"
              name="arrivalDate"
              type="date"
              value={formData.arrivalDate}
              onChange={handleChange}
            />
            <InputField
              label="Departure"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
            />
            <InputField
              label="Room Type"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
            />
            <InputField
              label="Total Night"
              name="totalNight"
              type="number"
              value={formData.totalNight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          onClick={handleSave}
          className="w-full mt-10 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-md shadow-lg transform active:scale-95 transition-all"
        >
          SAVE RESERVATION DATA
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
