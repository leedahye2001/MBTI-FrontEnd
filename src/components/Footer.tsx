import GLogo from "../assets/logo/GLogo.png";
const member = [
  {
    name: "배종현",
    stack: "Front-End",
    githubId: "JongJong00",
  },
  {
    name: "이다혜",
    stack: "Front-End",
    githubId: "leedahye2001",
  },
  {
    name: "김대영",
    stack: "Back-End",
    githubId: "kdozlo",
  },
  {
    name: "박기현",
    stack: "Back-End",
    githubId: "kiryanchi",
  },
  {
    name: "채정민",
    stack: "Back-End",
    githubId: "chaejm55",
  },
];

const Footer = () => {
  const frontEndMembers = member.filter((mem) => mem.stack === "Front-End");
  const backEndMembers = member.filter((mem) => mem.stack === "Back-End");

  return (
    <>
      <div className="mt-10 py-[10px] px-[8px] laptop:px-[20px] bg-white text-[#333]">
        <div className="grid grid-cols-2  text-left">
          {/* Front-End 좌측 */}
          <div className="float-left">
            {frontEndMembers.map(({ name, stack, githubId }) => (
              <div key={githubId} className="text-[10px] laptop:text-[14px]">
                <h2>
                  🌱 <b>{name}</b> {stack}
                </h2>
                <h3 className="pb-[10px] text-primary-200 font-semibold">
                  👉 GitHubLink{" "}
                  <a
                    href={`https://github.com/${githubId}`}
                    className="underline text-[#333]"
                  >
                    {" "}
                    {githubId}
                  </a>
                </h3>
              </div>
            ))}
          </div>

          {/* Back-End 우측 */}
          <div className="float-right">
            {backEndMembers.map(({ name, stack, githubId }) => (
              <div key={githubId} className="text-[10px] laptop:text-[14px]">
                <h2>
                  🌱 <b>{name}</b> {stack}
                </h2>
                <h3 className="pb-[10px] text-primary-200 font-semibold">
                  👉 GitHubLink{" "}
                  <a
                    href={`https://github.com/${githubId}`}
                    className="underline text-[#333]"
                  >
                    {" "}
                    {githubId}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center py-[10px] text-[10px] laptop:text-[14px] font-semibold">
          Copyrightⓒ2023 GDTI All rights reserved.
        </p>
        <div className="flex items-center justify-center text-center py-2">
          <img className="w-[50px]" src={GLogo} alt="GDTI small logo" />
        </div>
      </div>
    </>
  );
};

export default Footer;
