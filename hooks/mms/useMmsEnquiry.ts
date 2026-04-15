import { useState } from 'react';
import { submitMmsEnquiry } from '../../services/mms';
import type { MmsEnquiryPayload } from '../../services/mms/types';

type ApiErrorPayload = {
  status?: number;
  data?: {
    message?: string;
    errors?: Record<string, string[] | string>;
  };
};

function getApiErrorMessage(error: unknown): string {
  const parsed = error as ApiErrorPayload;
  const message = parsed?.data?.message;
  const errors = parsed?.data?.errors;

  if (errors && typeof errors === 'object') {
    const firstValue = Object.values(errors)[0];
    if (Array.isArray(firstValue) && firstValue.length > 0) {
      return String(firstValue[0]);
    }
    if (typeof firstValue === 'string') {
      return firstValue;
    }
  }

  if (typeof message === 'string' && message.trim().length > 0) {
    return message;
  }

  return 'Failed to submit enquiry. Please try again.';
}

export function useMmsEnquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: MmsEnquiryPayload) => {
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await submitMmsEnquiry(payload);
      setSuccess(response.message || 'Enquiry submitted successfully.');
      return true;
    } catch (error) {
      setError(getApiErrorMessage(error));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, success, error };
}
