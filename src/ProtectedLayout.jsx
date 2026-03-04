export default function ProtectedLayout({ children }) {
  return (
    <div className="page">
      {/* Background Shapes */}
     
      <div className="content">
        {children}
      </div>
      <div className="shape shape-left-bottom"></div>
      <div className="shape shape-center-dot"></div>
      <div className="shape shape-right-bottom"></div>
    </div>
  );
}