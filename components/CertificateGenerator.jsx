/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CertificatePDFGenerator({
  logoUrl = "/carbon-logo.png",
  badgeUrl = "/badge.png",
  projectDetails = {},
  certificateDetails = {},
  autoAction = "preview",
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);
  const pdfRef = useRef(null);

  const CERT_W = 1123;
  const CERT_H = 794;

  const mapped = {
    certificateNumber:
      certificateDetails.certificate_number ||
      certificateDetails.certificateNumber ||
      "N/A",
    issueDate:
      certificateDetails.date_of_issue ||
      certificateDetails.certificate_date ||
      "N/A",
    purchaserName:
      certificateDetails.purchaser_name ||
      certificateDetails.recipient_name ||
      "N/A",
    projectName:
      certificateDetails.project_name ||
      certificateDetails.product_name ||
      projectDetails.name ||
      "N/A",
    projectType:
      projectDetails.project_type || certificateDetails.project_type || "N/A",
    projectLocation:
      projectDetails.location || certificateDetails.project_location || "N/A",
    projectId:
      projectDetails.identification_number ||
      certificateDetails.sku_project_id ||
      projectDetails.project_id_display ||
      "N/A",
    registry: certificateDetails.registry || projectDetails.registry || "N/A",
    vintageYear:
      certificateDetails.vintage_year || projectDetails.vintage || "N/A",
    carbonCredits: `${
      certificateDetails.carbon_emission_metric_tons ??
      certificateDetails.offset_amount ??
      0
    } mT`,
    pricePerTon:
      certificateDetails.price_per_metric_ton_usd ||
      projectDetails.price_per_ton ||
      "N/A",
    totalCost: certificateDetails.total_cost_usd || "N/A",
    purchaserEmail: certificateDetails.email || "",
    certificateStatement: certificateDetails.certificate_statement || "",
    projectImage: projectDetails.image_url || projectDetails.image || "",
  };

  useEffect(() => {
    if (autoAction === "download") {
      const t = setTimeout(() => handleDownload(), 500);
      return () => clearTimeout(t);
    }
  }, [autoAction]);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const containerWidth = wrapperRef.current.clientWidth || 0;
      const newScale = Math.min(containerWidth / CERT_W, 1);
      setScale(newScale);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCertificateContent = (isForPDF = false) => (
    <div
      id={isForPDF ? "certificate-content-pdf" : "certificate-content-preview"}
      ref={isForPDF ? null : pdfRef}
      className="relative overflow-hidden border-2 border-gray-900 bg-white mx-auto"
      style={{
        width: `${CERT_W}px`,
        height: `${CERT_H}px`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&h=800&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Layout */}
      <div className="relative flex flex-row h-full">
        {/* Left badge section */}
        <div className="flex flex-col items-center justify-start w-[350px] px-8 p-8">
          <div className="relative w-64 h-64 mt-12">
            <img
              src={badgeUrl}
              alt="Certificate Badge"
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Right content section*/}
        <div className="flex flex-col justify-between flex-1 bg-white px-10 py-10">
          {/* Header */}
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="text-left">
              <h1 className="text-5xl font-bold text-[#0f5132] mb-1 tracking-wide">
                CERTIFICATE
              </h1>
              <h2 className="text-5xl text-gray-400 tracking-wide font-thin">
                OF PURCHASE
              </h2>
            </div>
            <div className="text-right flex items-center justify-end">
              <img
                src={logoUrl}
                alt="Company Logo"
                className="h-12 w-auto object-contain"
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-10"></div>

          {/* Purchaser Info */}
          <div className="mb-10 text-left">
            <h3 className="text-base font-bold text-gray-700 tracking-widest mb-2">
              PROUDLY PRESENTED TO
            </h3>
            <p className="text-5xl text-[#0f5132] tracking-wider break-words">
              {mapped.purchaserName}
            </p>
          </div>

          {/* Project Info */}
          <div className="flex-1 space-y-4 text-base text-gray-700">
            <div className="font-bold text-gray-900 mb-4 text-left">
              {mapped.carbonCredits} Of Carbon Credits From The{" "}
              {mapped.projectName}
            </div>

            <div className="space-y-3">
              {[
                ["Project Type", mapped.projectType],
                ["Project Location", mapped.projectLocation],
                ["Project Identification Number", mapped.projectId],
                ["Registry", mapped.registry],
                ["Vintage Year", mapped.vintageYear],
              ].map(([label, value]) => (
                <div
                  className="flex flex-row items-center space-x-2"
                  key={label}
                >
                  <span className="font-bold text-gray-800">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-gray-300">
            <div className="flex justify-between items-start flex-row text-left">
              <div className="inline-block text-center min-w-[200px]">
                <span className="text-base font-bold text-gray-700 block mb-1">
                  {mapped.certificateNumber}
                </span>
                <div className="w-full border-t-2 border-gray-400"></div>
                <div className="text-sm text-gray-600 uppercase tracking-wider mt-1">
                  Certificate Number
                </div>
              </div>

              <div className="inline-block text-center min-w-[120px]">
                <span className="text-base font-bold text-gray-700 block mb-1">
                  {mapped.issueDate}
                </span>
                <div className="w-full border-t-2 border-gray-400"></div>
                <div className="text-sm text-gray-600 uppercase tracking-wider mt-1">
                  Date
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // all images within an element to be loaded OR error
  const waitForImagesToLoad = (el, timeout = 5000) =>
    new Promise((resolve) => {
      const imgs = Array.from(el.querySelectorAll("img"));
      if (!imgs.length) return resolve(true);

      let remaining = imgs.length;
      let timedOut = false;

      const onDone = () => {
        if (timedOut) return;
        remaining -= 1;
        if (remaining <= 0) resolve(true);
      };

      const timer = setTimeout(() => {
        timedOut = true;
        // resolve anyway — sometimes images may never load but we still want to try
        resolve(false);
      }, timeout);

      imgs.forEach((img) => {
        // If image already loaded and has dimensions, count it as loaded
        if (img.complete && img.naturalWidth && img.naturalHeight) {
          onDone();
        } else {
          // attach handlers
          img.addEventListener(
            "load",
            function () {
              onDone();
            },
            { once: true }
          );
          img.addEventListener(
            "error",
            function () {
              onDone();
            },
            { once: true }
          );
        }
      });

      // If there were no images to wait for
      if (imgs.length === 0) {
        clearTimeout(timer);
        resolve(true);
      }
    });

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      let element = document.getElementById("certificate-content-pdf");

      // attempt to use the preview element
      if (!element) {
        element = document.getElementById("certificate-content-preview");
      }

      if (!element) {
        alert("Certificate content not found!");
        setIsGenerating(false);
        return;
      }

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // finding an offscreen wrapper, If not found, cloning preview node into an offscreen container.
        let offscreen = document.getElementById("certificate-pdf-offscreen");
        if (!offscreen) {
          offscreen = document.createElement("div");
          offscreen.id = "certificate-pdf-offscreen";
          offscreen.style.position = "absolute";
          offscreen.style.left = "-9999px";
          offscreen.style.top = "-9999px";
          offscreen.style.width = `${CERT_W}px`;
          offscreen.style.height = `${CERT_H}px`;
          document.body.appendChild(offscreen);
        }

        // if the PDF isnt full-size content inside offscreen, clone the preview into it
        const existingPdf = offscreen.querySelector("#certificate-content-pdf");
        if (!existingPdf) {
          // deep clone preview content
          const preview = document.getElementById(
            "certificate-content-preview"
          );
          if (!preview) {
            alert("No certificate preview available to generate PDF from.");
            setIsGenerating(false);
            return;
          }
          const clone = preview.cloneNode(true);
          clone.id = "certificate-content-pdf";
          clone.style.transform = "none";
          clone.style.transformOrigin = "top left";
          clone.style.width = `${CERT_W}px`;
          clone.style.height = `${CERT_H}px`;
          offscreen.appendChild(clone);
          element = clone;
        } else {
          element = existingPdf;
        }
      }

      // Waiting for images inside the element to load
      await waitForImagesToLoad(element, 8000);

      // html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // canvas has zero size it's a sign something went wrong
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        console.error("html2canvas produced empty canvas", canvas);
        throw new Error(
          "html2canvas produced empty canvas - element was probably hidden or had 0 size"
        );
      }

      // PNG export
      let imgData = canvas.toDataURL("image/png", 1.0);

      // If the dataURL invalid, redrawing to a fresh canvas
      if (!imgData || !imgData.startsWith("data:image/")) {
        try {
          const tmp = document.createElement("canvas");
          tmp.width = canvas.width;
          tmp.height = canvas.height;
          const ctx = tmp.getContext("2d");
          ctx.drawImage(canvas, 0, 0);
          imgData = tmp.toDataURL("image/png", 1.0);
        } catch (convErr) {
          console.error("Fallback conversion failed", convErr);
        }
      }

      if (!imgData || !imgData.startsWith("data:image/")) {
        console.error(
          "Invalid image data returned by html2canvas:",
          imgData && imgData.slice(0, 80)
        );
        throw new Error(
          "Invalid image data - likely a CORS/tainted canvas or unsupported image format."
        );
      }

      const mime = imgData.substring(5, imgData.indexOf(";"));
      const format = mime.split("/")[1].toUpperCase();

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, format, 0, 0, 297, 210);
      pdf.save(`Certificate-${mapped.certificateNumber}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. " + (err.message || ""));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center mb-4 gap-2">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 
                     bg-btn-secondary text-white rounded hover:bg-btn-secondary-hover 
                     disabled:opacity-60 w-full sm:w-auto"
        >
          <FileDown className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Download PDF"}
        </button>
      </div>

      {/* Certificate Preview */}
      <div
        ref={wrapperRef}
        className="w-full flex justify-center overflow-hidden touch-pan-y"
        style={{
          height: `${CERT_H * scale}px`,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {renderCertificateContent(false)}
        </div>
      </div>

      <div
        id="certificate-pdf-offscreen"
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          width: `${CERT_W}px`,
          height: `${CERT_H}px`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {renderCertificateContent(true)}
      </div>

      <div className="text-xs text-gray-500 text-center mt-4">
        You are previewing the certificate above. Click &quot;Download PDF&quot;
        to save a printable version.
      </div>
    </div>
  );
}
