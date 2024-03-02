import { Banner } from "./componenets/Banner";


const PiiIdentifier = () => {

    return (
        <>
            <Banner />
            <div className="flex flex-row bg-neutral-900 w-full h-screen pt-20">
                <div id="pii-identifier-information">
                    <h1 className="text-4xl font-bold text-white">PII Identifier</h1>
                    <p className="text-white">This page is for the PII Identifier</p>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default PiiIdentifier;
