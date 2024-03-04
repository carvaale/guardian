import Banner from "./componenets/Banner";

const PiiIdentifier = () => {
  return (
    <>
      <Banner />
      <div
        id="topo"
        className="flex flex-row justify-evenly items-center w-full h-screen pt-20"
      >
        <div className="w-3/4 m-10 flex flex-row justify-between space-x-10 rounded-3xl bg-neutral-800 p-10">
          <div className="w-1/2 flex flex-col gap-y-2">
            <h1 className="text-xl font-bold text-white">PII Identifier</h1>
            <span className="text-white text-sm">
              The PII Identifier is used to define keywords that will be
              stripped from LLM interactions. This is useful for defining
              keywords that may be organization specific such as passwords, api
              keys, and confidential information, to ensure they are not leaked.
            </span>
            <div id="bar" className="w-full bg-neutral-50" />
            <span className="text-white text-md">
              Keywords:{" "}
              <span className="text-white">
                {" "}
                <span className="bg-orange-300">Amazon</span>{" "}
                <span className="bg-teal-300">Sagemaker</span>{" "}
                <span className="bg-purple-300">kajdh124faufh23</span>
              </span>
            </span>
            <span className="text-white text-md underline">Before</span>
            <span className="text-white text-sm">
              I work at <span className="bg-orange-300">Amazon</span> and I'm
              building a <span className="bg-teal-300">Sagemaker</span> API that
              uses keys <span className="bg-purple-300">kajdh124faufh23</span>
            </span>
            <span className="text-white text-md underline">After</span>
            <span className="text-white text-sm">
              I work at <span className="bg-orange-300">[REDACTED-PII]</span>{" "}
              and I'm building a{" "}
              <span className="bg-teal-300">[REDACTED-PII]</span> API that uses
              keys <span className="bg-purple-300">[REDACTED-PII]</span>
            </span>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-y-3">
            <textarea
              className="h-full w-full bg-transparent text-gray-400 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 invalid:border-red-500 dark:placeholder-gray-300"
              placeholder="Enter PII keywords here"
              name="pii"
              id="pii"
            />
            <button className="h-9 px-3 w-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
              Save PII Keys
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PiiIdentifier;
