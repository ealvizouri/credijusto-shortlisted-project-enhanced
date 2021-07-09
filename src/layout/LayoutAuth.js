import HeaderNav from "../components/HeaderNav";

export default function LayoutAuth({children}) {
    return (<>
        <div className="bg-overlay"></div>
        <HeaderNav />
        {children}
    </>);
}