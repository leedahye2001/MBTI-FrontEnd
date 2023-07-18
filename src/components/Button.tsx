interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  logoSrc: string;
  logoSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  logoSrc,
  logoSize = "w-8 m-2",
}) => {
  return (
    <button
      className="mt-4 rounded-xl bg-gradient-to-r from-primary-400 via-primary-200 to-primary-100 px-[6px] py-[6px]"
      onClick={onClick}
    >
      <div className="rounded-md flex h-full w-full items-center justify-center bg-[#FAFAFA] back">
        <img src={logoSrc} className={`${logoSize}`} />
        <h1 className="font-bold text-black text-[15px] mx-4 my-1">
          {children}
        </h1>
      </div>
    </button>
  );
};

export default Button;
