
import { useState, useRef, useEffect } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import SignaturePad from "react-signature-canvas";
import Button from "@mui/material/Button";

const motorcycleBrands = ["Honda", "Yamaha", "KTM", "Suzuki", "Kawasaki", "Other"];
const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());
const offRoadModels = {
  Honda: ["CR125", "CR250", "CR500", "CRF150R", "CRF230F", "CRF250R", "CRF250X", "CRF450R", "CRF450X", "XR200", "XR250", "XR400", "XR650R"],
  Yamaha: ["PW50", "PW80", "YZ65", "YZ80", "YZ85", "YZ125", "YZ250", "YZ250F", "YZ450F", "WR200", "WR250F", "WR450F", "DT200", "DT230", "IT200", "IT250", "IT490"],
  KTM: ["50 SX", "65 SX", "85 SX", "125 SX", "150 SX", "250 SX", "300 SX", "250 XC", "300 XC", "350 SX-F", "450 SX-F", "500 EXC", "250 EXC", "300 EXC", "380 EXC"],
  Suzuki: ["RM80", "RM85", "RM125", "RM250", "RMX250", "RM-Z250", "RM-Z450", "DRZ250", "DRZ400", "DR650"],
  Kawasaki: ["KX60", "KX65", "KX80", "KX85", "KX125", "KX250", "KX450", "KX500", "KDX200", "KDX220", "KDX250"],
  Other: []
};
const services = ["Top End Rebuild", "Fork Service", "Rear Shock Service", "Front Wheel Bearing", "Steering Bearing", "Rear Wheel Bearing", "Swing Arm Bearing", "Swing Arm Linkage Bearing", "Engine Top And Bottom Rebuild", "Electrical Issue", "Basic Service", "Standard Service", "Premium Service"];




export default function MotorcycleServiceApp() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    customerAddress: "",
    customerContact: "",
    motorcycleBrand: "",
    manualBrand: "",
    year: "",
    model: "",
    manualModel: "",
    services: {},
    estimatedQuote: "",
    notes: "",
    serviceDate: "",
    customerSignature: ""
  });
  const sigPad = useRef(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch(err => console.error("Service Worker registration failed:", err));
    }
  }, []);

  const clearSignature = () => {
    sigPad.current.clear();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Motorcycle Service Booking</h1>
      <Card>
        <CardContent className="p-4 space-y-2">
          <Input placeholder="Customer Name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          <Input placeholder="Customer Address" value={form.customerAddress} onChange={(e) => setForm({ ...form, customerAddress: e.target.value })} />
          <Input placeholder="Customer Contact Number" value={form.customerContact} onChange={(e) => setForm({ ...form, customerContact: e.target.value })} />
          
          <select value={form.motorcycleBrand} onChange={(e) => setForm({ ...form, motorcycleBrand: e.target.value })} className="border p-2 w-full rounded-md">
            <option value="" disabled>Select Brand</option>
            {motorcycleBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          
          {form.motorcycleBrand === "Other" && <Input placeholder="Enter Brand Manually" value={form.manualBrand} onChange={(e) => setForm({ ...form, manualBrand: e.target.value })} />}
          
          <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="border p-2 w-full rounded-md">
            <option value="" disabled>Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {form.motorcycleBrand && offRoadModels[form.motorcycleBrand] && (
            <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="border p-2 w-full rounded-md">
              <option value="" disabled>Select Model</option>
              {offRoadModels[form.motorcycleBrand].map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          )}
          
          {form.motorcycleBrand === "Other" && <Input placeholder="Enter Model Manually" value={form.manualModel} onChange={(e) => setForm({ ...form, manualModel: e.target.value })} />}
          
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox checked={form.services[service]} onChange={(e) => setForm({ ...form, services: { ...form.services, [service]: e.target.checked } })} />
                <span>{service}</span>
              </div>
            ))}
          </div>
          
          <Input placeholder="Estimated Quote" value={form.estimatedQuote} onChange={(e) => setForm({ ...form, estimatedQuote: e.target.value })} />
          <Input placeholder="Notes and Updates" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <Input placeholder="Service Date" value={form.serviceDate} onChange={(e) => setForm({ ...form, serviceDate: e.target.value })} />
          
          <div>
            <SignaturePad ref={sigPad} canvasProps={{ className: "border w-full h-24" }} />
            <Button onClick={clearSignature}>Clear Signature</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
