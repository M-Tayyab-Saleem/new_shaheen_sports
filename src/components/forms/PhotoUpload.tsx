import { useRef, useState } from 'react';
import { RefreshCw, Trash2, UploadCloud } from 'lucide-react';

interface PhotoUploadProps {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}

const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function PhotoUpload({ value, onChange, error }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string>('');

  function handleFile(file: File | undefined) {
    if (!file) return;
    setLocalError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setLocalError('Please select a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > MAX_BYTES) {
      setLocalError('Passport photograph must be smaller than 3 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  const displayError = localError || error;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#F8FAFC]">
        Passport-Size Photograph <span className="text-[#FF5500]">*</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="sr-only"
        aria-label="Upload passport photograph"
      />

      {value ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-xl border border-white/10 bg-[#0D111A] p-4">
          <img
            src={value}
            alt="Applicant passport photo preview"
            className="h-28 w-24 rounded-lg object-cover border border-white/15 shrink-0"
          />
          <div className="space-y-3">
            <p className="text-xs text-[#94A3B8]">
              Photo ready for private submission. Ensure your face is clearly visible.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
                Replace Photo
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 px-3.5 py-2 text-xs font-semibold text-[#F87171] hover:bg-[#EF4444]/20 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center transition-colors ${
            displayError
              ? 'border-[#EF4444] bg-[#EF4444]/5'
              : 'border-white/15 bg-[#0D111A] hover:border-[#FF5500]/60 hover:bg-[#111725]'
          }`}
        >
          <UploadCloud className="h-7 w-7 text-[#FF5500]" strokeWidth={1.75} />
          <span className="text-sm font-semibold text-[#F8FAFC]">
            Click to upload passport photo
          </span>
          <span className="text-xs text-[#64748B]">
            JPG, PNG, or WebP · Maximum file size 3 MB
          </span>
        </button>
      )}

      {displayError && (
        <p role="alert" className="text-xs font-medium text-[#EF4444]">
          {displayError}
        </p>
      )}
    </div>
  );
}
