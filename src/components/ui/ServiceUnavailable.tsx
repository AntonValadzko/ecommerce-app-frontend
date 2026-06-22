import Link from 'next/link';

interface ServiceUnavailableProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ServiceUnavailable({
  title = 'Service temporarily unavailable',
  message = 'We could not load this page right now. The server may be offline — please try again in a moment.',
  onRetry,
}: ServiceUnavailableProps) {
  return (
    <section
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-amber-300 bg-amber-50 py-16 text-center"
    >
      <h2 className="text-lg font-medium text-slate-800">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-slate-600">{message}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn-primary">
            Try again
          </button>
        )}
        <Link href="/" className={onRetry ? 'btn-secondary' : 'btn-primary'}>
          Back to catalog
        </Link>
      </div>
    </section>
  );
}
