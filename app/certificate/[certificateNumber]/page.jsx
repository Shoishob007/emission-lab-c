"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import CertificatePDFGenerator from "@/components/CertificateGenerator";

export default function CertificatePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const certificateNumber = params?.certificateNumber;
  const action = searchParams?.get("action") || "preview";
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [certificatePayload, setCertificatePayload] = useState(null);

  useEffect(() => {
    if (!certificateNumber) return;

    const fetchCertificate = async () => {
      setLoading(true);
      setApiError(null);

      try {
        const base = process.env.NEXT_PUBLIC_API || "";
        const res = await fetch(
          `${base}/api/offset/certificates/${certificateNumber}`
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch certificate: ${res.status} ${text}`);
        }
        const json = await res.json();

        if (!json.success) {
          throw new Error("API returned success: false");
        }

        // Normalized payload
        setCertificatePayload({
          project_details: json.project_details || {},
          certificate_details: json.certificate_details || {},
        });
      } catch (err) {
        console.error("Error fetching certificate data:", err);
        setApiError(err.message || "Failed to fetch certificate data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateNumber]);

  if (!certificateNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-600">No certificate specified.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-600">Loading certificate...</p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-red-700">Error</h3>
          <p className="text-sm text-red-600 mb-4">{apiError}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto p-4">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Certificate {certificateNumber}
            </h1>
            <p className="text-sm text-gray-500">
              Download your certificate PDF
            </p>
          </div>
        </div>

        {/* Certificate generator */}
        <CertificatePDFGenerator
          projectDetails={certificatePayload.project_details}
          certificateDetails={certificatePayload.certificate_details}
          autoAction={action}
        />
      </div>
    </div>
  );
}
