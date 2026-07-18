export default function LoadingSpinner({ size = 28 }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block animate-spin rounded-full border-2 border-primary/20 border-t-primary"
      style={{ width: size, height: size }}
    />
  );
}
