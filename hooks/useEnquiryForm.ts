import { useState } from 'react';
import { submitAdmissionEnquiry } from '../services/enquiries';
import type { AdmissionEnquiryPayload } from '../services/enquiries';

export function useEnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: AdmissionEnquiryPayload): Promise<boolean> => {
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await submitAdmissionEnquiry(payload);
      setSuccess(response.message || 'Enquiry submitted successfully.');
      return true;
    } catch {
      setError('Failed to submit enquiry. Please check your details and try again.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(null);
    setError(null);
  };

  return { submit, submitting, success, error, reset };
}
