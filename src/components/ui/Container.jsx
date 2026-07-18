export default function Container({ children, className = "", ...rest }) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 md:px-10 lg:px-14 ${className}`} {...rest}>
      {children}
    </div>
  );
}
