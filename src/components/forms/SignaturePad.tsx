import { useEffect, useRef, useState } from 'react';
import { Eraser } from 'lucide-react';

interface SignaturePadProps {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}

export function SignaturePad({ value, onChange, error }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [hasStroke, setHasStroke] = useState(Boolean(value));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function initCanvas() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(180 * dpr));
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#0A0E17';
      ctx.fillRect(0, 0, rect.width, 180);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    initCanvas();
  }, []);

  function getPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pt = getPoint(e);
    lastPointRef.current = pt;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt.x + 0.1, pt.y + 0.1);
      ctx.stroke();
    }
    setHasStroke(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || !lastPointRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const current = getPoint(e);
    const prev = lastPointRef.current;
    const midX = (prev.x + current.x) / 2;
    const midY = (prev.y + current.y) / 2;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    ctx.stroke();

    lastPointRef.current = current;
  }

  function handlePointerUp() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    if (canvasRef.current) {
      onChange(canvasRef.current.toDataURL('image/png'));
    }
  }

  function handleClear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0A0E17';
      ctx.fillRect(0, 0, rect.width, 180);
    }
    setHasStroke(false);
    onChange('');
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label className="block text-sm font-semibold text-[#F8FAFC]">
          Applicant Digital Signature <span className="text-[#FF5500]">*</span>
        </label>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/25 transition-colors"
        >
          <Eraser className="h-3.5 w-3.5" strokeWidth={1.75} />
          Clear Signature
        </button>
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border ${
          error ? 'border-[#EF4444]' : 'border-white/15'
        } bg-[#0A0E17]`}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none', height: '180px' }}
          className="block w-full cursor-crosshair"
          aria-label="Digital signature pad"
        />
        {!hasStroke && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-[#64748B]">
              Sign inside this box using your finger, mouse, or stylus
            </span>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  );
}
