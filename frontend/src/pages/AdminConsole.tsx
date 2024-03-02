import Banner from "./componenets/Banner";

const AdminConsole = () => {

    return (
        <>
        <Banner />
        <div id="topo" className=" flex flex-col bg-neutral-900 w-full h-screen pt-20">
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Admin Console</h1>
                    <p className="text-white">This page is for the Admin Console</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminConsole;
