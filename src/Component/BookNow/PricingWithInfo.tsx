/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import DOMPurify from 'isomorphic-dompurify';

type RefundApiItem = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  refundPolicy: string; // HTML
};

type RefundApiResponse = {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: RefundApiItem[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PricingWithInfo({ data }: any) {
  const [expanded, setExpanded] = useState({ importantNotice: false });

  const [policyHtml, setPolicyHtml] = useState<string>('');
  const [policyLoading, setPolicyLoading] = useState<boolean>(false);
  const [policyError, setPolicyError] = useState<string | null>(null);

useEffect(() => {
  let mounted = true;

  (async () => {
    try {
      setPolicyLoading(true);
      setPolicyError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refund/retrive`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json: RefundApiResponse = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || 'Failed to retrieve refund policy');
      }

      // ✅ Handle both { data: [...] } and { data: { ... } }
      const dataAny = json.data as any;
      const item: RefundApiItem | undefined = Array.isArray(dataAny) ? dataAny[0] : dataAny;
      const html = item?.refundPolicy ?? '';

      if (mounted) setPolicyHtml(html);
    } catch (err: any) {
      if (mounted) setPolicyError(err?.message || 'Could not load refund policy');
    } finally {
      if (mounted) setPolicyLoading(false);
    }
  })();

  return () => {
    mounted = false;
  };
}, []);

  return (
    <div className="max-w-7xl px-5 mx-auto">
      {/* Pricing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
        <div className="text-sm space-y-1">
          <div>90 AED Per Adult</div>
          <div>80 AED Per Child (Age 3-9 Years)</div>
        </div>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Timings</h3>
        <div className="text-sm space-y-1">
          <div>{data?.pickup} (Expected Pickup)</div>
          <div>{data?.drop_off} (Expected Drop off)</div>
        </div>
      </div>

      {/* Important Notice (collapsible) */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setExpanded((p) => ({ ...p, importantNotice: !p.importantNotice }))}
        >
          <h3 className="text-lg font-semibold">Important Notice</h3>
          {expanded.importantNotice ? <MdExpandLess /> : <MdExpandMore />}
        </div>
        {expanded.importantNotice && (
          <div className="text-sm mt-2 space-y-2">
            <div>• Kids below 3 years are free of charge.</div>
            <div>• Pickup and Drop off from home/hotel anywhere in Dubai.</div>
            <div>• Minimum of 2 hour booking is required. In case of short notice (less than 12 Hours).</div>
            <div>• Contact to check the availability.</div>
          </div>
        )}
      </div>

      {/* Cancellation & Refund Policy (from API) */}
  <div className="mb-6">
  <h3 className="text-lg font-semibold mb-2">Cancellation & Refund Policy</h3>

  {policyLoading && <div className="text-sm text-gray-500">Loading policy…</div>}
  {policyError && <div className="text-sm text-red-500 mb-2">{policyError}</div>}

  {policyHtml ? (
    <div
      className="prose prose-sm max-w-none text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policyHtml) }}
    />
  ) : (
    !policyLoading && !policyError && (
      <div className="text-sm text-gray-500">No policy available.</div>
    )
  )}
</div>

      {/* Included / Excluded */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Included / Excluded</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data?.included?.map((item: any, i: number) => (
            <div key={i} className="flex items-center text-sm">
              <FaCheck className="text-green-500 mr-2 text-xs" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Tour Plan</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex items-center justify-between cursor-pointer">
            <span className="font-medium">Important Notice</span>
            <MdExpandMore />
          </div>
          {data?.tour_plan?.map((item: any, i: number) => (
            <div key={i} className="flex items-center text-sm mt-3">
              <FaCheck className="text-green-500 mr-2 text-xs" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <div className="text-sm leading-relaxed">{data?.description}</div>
      </div>
    </div>
  );
}
