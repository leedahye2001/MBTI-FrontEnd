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
      <div className="py-[10px] px-[8px] laptop:px-[20px] bg-white text-[#333] text-left">
        <div className="grid grid-cols-2">
          {/* Front-End 좌측 */}
          <div className="float-left">
            {frontEndMembers.map(({ name, stack, githubId }) => (
              <div key={githubId} className="text-[10px] laptop:text-[14px]">
                <h2>
                  {name} {stack}
                </h2>
                <h3 className="pb-[10px]  font-semibold">
                  👉 GitHubLink{" "}
                  <a
                    href={`https://github.com/${githubId}`}
                    className="underline text-primary-100"
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
                  {name} {stack}
                </h2>
                <h3 className="pb-[10px] font-semibold">
                  👉 GitHubLink{" "}
                  <a
                    href={`https://github.com/${githubId}`}
                    className="underline text-primary-100"
                  >
                    {githubId}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center py-[10px] text-[10px] laptop:text-[14px]">
          Copyrightⓒ2023 GDTI All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
