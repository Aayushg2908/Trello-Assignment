const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-white to-purple-400">
      {children}
    </div>
  );
};

export default AuthLayout;
