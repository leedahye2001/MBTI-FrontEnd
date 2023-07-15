import { ReactElement } from "react";


const MainLayout = ({ children }: { children: ReactElement }) => {



  return (
    <>
      
      <div className="mx-auto mt-16 max-w-4xl px-4">
        <h1 className="text-4xl">MBTI</h1>
        


      </div>
      <main className="mx-auto max-w-4xl px-4 py-4">{children}</main>
    </>
  );
};

export default MainLayout;
