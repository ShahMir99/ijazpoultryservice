import SideBar from "@/components/SideBar";

export default function MainLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="w-full">
            <SideBar>
                {children}
            </SideBar>
        </div>
    )
}