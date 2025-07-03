/* eslint-disable @next/next/no-img-element */
import { Settings } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    interested: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // success message
    Swal.fire({
      title: "Form Submitted!",
      text: "Thank you for contacting us. We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#0a2d23",
      confirmButtonText: "OK",
    });

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      interested: "",
    });
  };

  return (
    <section
      id="contact"
      className="w-full bg-white py-16 px-4 flex items-center justify-center font-['Montserrat','Arial','Helvetica',sans-serif']"
    >
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center bg-green-900/10 rounded-full p-2">
              <Settings size={22} strokeWidth={2} className="text-primary" />
            </span>
            <span className="uppercase text-primary tracking-widest text-sm font-semibold">
              Contact Us
            </span>
          </div>
          {/* Top: Hero */}
          <div className="rounded-t-2xl rounded-b-lg bg-[#0a2d23] p-8 md:p-10 text-left mb-2">
            <h1
              className="text-white text-4xl font-semibold mb-5 leading-tight"
              style={{ lineHeight: 1.1, fontWeight: 600 }}
            >
              Get in Touch with
              <br />
              <span className="text-primary">Emission Lab</span>
            </h1>
            <p className="text-[#eaf6e5] text-lg leading-relaxed">
              We’d love to learn more about your company and how we can assist
              you. Fill out the form to tell us more, and we’ll get back to you.
            </p>
          </div>
          {/* Middle: Direct Contact Message */}
          <div className="rounded-lg bg-[#eaf3e5] text-[#1a3323] text-lg px-6 py-4 mb-2">
            If you prefer, feel free to contact us directly via the emails
            listed below.
          </div>
          {/* Contact grid */}
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div className="rounded-lg bg-white px-6 py-5">
              <div className="font-semibold text-[#1a3323] mb-1">
                General Inquiries
              </div>
              <div className="text-[#1a3323] text-base">
                hello@aiemissionlab.com
              </div>
            </div>
            <div className="rounded-lg bg-white px-6 py-5">
              <div className="font-semibold text-[#1a3323] mb-1">Sales</div>
              <div className="text-[#1a3323] text-base">
                sales@aiemissionlab.com
              </div>
            </div>
          </div>
          {/* Technical Help */}
          <div className="rounded-b-2xl bg-white px-6 py-4">
            <div className="font-semibold text-[#1a3323]">
              Need Technical Product Help?
            </div>
            <a
              href="#"
              className="text-[#558068] underline font-medium text-base"
            >
              Get Tech Help
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <form
          className="rounded-2xl bg-white border border-[#d8e3c7] px-10 py-8 flex flex-col justify-between"
          style={{ minHeight: 640 }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-[#1a3323] font-medium mb-2"
                htmlFor="firstName"
              >
                First name<span className="text-[#ef4444]">*</span>
              </label>
              <input
                required
                id="firstName"
                className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary transition"
                value={form.firstName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, firstName: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                className="block text-[#1a3323] font-medium mb-2"
                htmlFor="lastName"
              >
                Last name<span className="text-[#ef4444]">*</span>
              </label>
              <input
                required
                id="lastName"
                className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary transition"
                value={form.lastName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lastName: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-[#1a3323] font-medium mb-2"
              htmlFor="email"
            >
              Business email<span className="text-[#ef4444]">*</span>
            </label>
            <input
              required
              id="email"
              type="email"
              className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary transition"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#1a3323] font-medium mb-2"
              htmlFor="phone"
            >
              Phone<span className="text-[#ef4444]">*</span>
            </label>
            <input
              required
              id="phone"
              className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary transition"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#1a3323] font-medium mb-2"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              required
              id="company"
              className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary transition"
              value={form.company}
              onChange={(e) =>
                setForm((f) => ({ ...f, company: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-[#1a3323] font-medium mb-2"
                htmlFor="location"
              >
                Company Location?
              </label>
              <select
                required
                id="location"
                className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base text-[#6d7c6e] outline-none focus:ring-2 focus:ring-primary transition"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
              >
                <option value="">Please Select</option>
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                className="block text-[#1a3323] font-medium mb-2"
                htmlFor="interested"
              >
                I&apos;m interested in
              </label>
              <select
                required
                id="interested"
                className="block w-full rounded-md border border-[#d8e3c7] bg-[#f4f7ec] px-4 py-2 text-base text-[#6d7c6e] outline-none focus:ring-2 focus:ring-primary transition"
                value={form.interested}
                onChange={(e) =>
                  setForm((f) => ({ ...f, interested: e.target.value }))
                }
              >
                <option value="">Please Select</option>
                <option value="offsetting">Offsetting</option>
                <option value="api">API Integration</option>
                <option value="projects">Project Listing</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          {/* Legal text */}
          <div className="mb-4 text-[#1a3323] text-sm leading-relaxed">
            By submitting this form, you are consenting to Emission Lab is
            contacting you. For information on how to unsubscribe, as well as
            our privacy practices, check out our{" "}
            <a href="#" className="text-[#2357b4] underline">
              Privacy Policy
            </a>
            .
          </div>
          {/* reCAPTCHA placeholder */}
          {/* <div className="mb-4">
            <img
              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
              alt="reCAPTCHA"
              className="inline mr-2"
              style={{
                height: 32,
                width: 32,
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            <span className="align-middle text-xs text-[#1a3323]">
              protected by reCAPTCHA
            </span>
          </div> */}
          {/* Submit button */}
          <button
            type="submit"
            className="rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold justify-center text-base flex items-center gap-2 shadow-lg px-8 py-3 transition mt-1"
          >
            Let&apos;s Talk
          </button>
        </form>
      </div>
    </section>
  );
}
