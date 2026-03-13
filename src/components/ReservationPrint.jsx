import React from "react";
import LogoImg from "../assets/img/logo.jpg";

const ReservationPrint = ({ data, onBack }) => {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-0 md:p-10 flex flex-col items-center">
      {/* Tombol Kontrol - Hilang saat di-print */}
      <div className="print:hidden mb-8 flex gap-4">
        <button 
          onClick={onBack}
          className="bg-white text-slate-600 px-6 py-2 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"
        >
          ← Kembali ke Dashboard
        </button>
        <button 
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          🖨️ Cetak Dokumen
        </button>
      </div>

      {/* KERTAS KONFIRMASI */}
      <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl shadow-slate-300 border border-slate-100 text-slate-800 font-serif leading-relaxed">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <img src={LogoImg} alt="Logo" className="w-20 h-20 object-contain mb-2" />
          <h1 className="text-xl font-bold tracking-widest text-slate-900">PPKD HOTEL</h1>
        </div>

        <div className="border-t border-b border-slate-800 py-1 mb-6">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest">Reservation Confirmation</h2>
        </div>

        {/* INFO PENERIMA & PENGIRIM (ATAS) */}
        <div className="grid grid-cols-2 gap-10 text-[12px] mb-8">
          <div className="space-y-1">
            <div className="flex"><span className="w-28">To.</span><span>: {data.guest_name}</span></div>
            <div className="flex"><span className="w-28">Company / Agent</span><span>: {data.company || "-"}</span></div>
            <div className="flex"><span className="w-28">Booking No.</span><span className="font-bold">: RES-{String(data.id).padStart(4, '0')}</span></div>
            <div className="flex"><span className="w-28">Book By</span><span>: {data.issued_by || "Receptionist"}</span></div>
            <div className="flex"><span className="w-28">Phone</span><span>: {data.phone}</span></div>
            <div className="flex"><span className="w-28">Email</span><span>: {data.email || "-"}</span></div>
          </div>
          <div className="space-y-1">
            <div className="flex"><span className="w-20">Telp</span><span>: (021) 3456789</span></div>
            <div className="flex"><span className="w-20">Fax</span><span>: (021) 9876543</span></div>
            <div className="flex"><span className="w-20">Email</span><span>: reservation@ppkdhotel.com</span></div>
            <div className="flex"><span className="w-20">Date</span><span>: {new Date().toLocaleDateString('id-ID')}</span></div>
          </div>
        </div>

        {/* DETAIL RESERVASI (TENGAH) */}
        <div className="space-y-1 text-[12px] mb-8">
          <div className="flex"><span className="w-40">First Name</span><span>: {data.guest_name.split(' ')[0]}</span></div>
          <div className="flex"><span className="w-40">Arrival Date</span><span>: {data.arrival_date} {data.arrival_time && `at ${data.arrival_time}`}</span></div>
          <div className="flex"><span className="w-40">Departure Date</span><span>: {data.departure_date || "-"}</span></div>
          <div className="flex"><span className="w-40">Total Night</span><span>: {data.departure_date ? "Calculation based on dates" : "-"}</span></div>
          <div className="flex"><span className="w-40">Room/Unit Type</span><span>: {data.room_type} / Room No: {data.room_no}</span></div>
          <div className="flex"><span className="w-40">Person Pax</span><span>: {data.num_of_person} Person</span></div>
          <div className="flex"><span className="w-40 font-bold">Room Rate Net</span><span>: Rp. (Sesuai Kebijakan)</span></div>
        </div>

        {/* PAYMENT GUARANTEE (SESUAI FOTO) */}
        <div className="text-[10px] leading-snug border-t border-slate-200 pt-4 mb-6">
          <p className="italic mb-4">Please guarantee this booking with credit card number with clear copy of the card both sides and card holder signature in the column provided. The copy of credit card both sides should be faxed to hotel fax number. Please settle your outstanding to or account:</p>
          
          <div className="space-y-1 mb-4">
            <div className="flex font-bold"><span className="w-40">Bank Transfer</span></div>
            <div className="flex"><span className="w-40">Mandiri Account</span><span>: 123-00-9999-888</span></div>
            <div className="flex"><span className="w-40">Mandiri Name Account</span><span>: PPKD HOTEL JAKARTA</span></div>
          </div>

          <div className="border-t border-slate-300 pt-4 space-y-1">
            <p className="font-bold italic mb-2">Reservation guaranteed by the following credit card:</p>
            <div className="flex"><span className="w-40">Card Number</span><span>: {data.card_number || "......................................." }</span></div>
            <div className="flex"><span className="w-40">Card holder name</span><span>: {data.card_holder_name || "......................................." }</span></div>
            <div className="flex"><span className="w-40">Card Type</span><span>: {data.card_type || "......................................." }</span></div>
            <div className="flex"><span className="w-40">Or by Bank Transfer to</span><span>: Mandiri Account</span></div>
            <div className="flex"><span className="w-40">Expired date/month/year</span><span>: {data.expired_card || "........ / ........ / ........" }</span></div>
            <div className="flex mt-8"><span className="w-40 font-bold italic">Card holder signature</span><span>: __________________________</span></div>
          </div>
        </div>

        {/* CANCELLATION POLICY */}
        <div className="text-[9px] text-slate-500 border-t border-slate-200 pt-4 mb-12">
          <p className="font-bold mb-1">Cancellation policy:</p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Please note that check in time is 02.00 pm and check out time 12.00 pm.</li>
            <li>All non guarantined reservations will automatically be released on 6 pm.</li>
            <li>The Hotel will charge 1 night for guaranteed reservations that have not been canceling before the day of arrival. Please carefully note your cancellation number.</li>
          </ol>
        </div>

        {/* FOOTER SIGNATURE */}
        <div className="flex justify-end mt-20 pr-10">
          <div className="text-center">
            <div className="w-48 border-b border-slate-800 mb-2"></div>
            <p className="text-[11px] font-bold">RESERVATION DEPARTMENT</p>
          </div>
        </div>

      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .bg-slate-50 { background: white !important; padding: 0 !important; }
          .shadow-2xl { shadow: none !important; box-shadow: none !important; }
          .border { border: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ReservationPrint;