import { API_PATHS } from "@/constants/apis";
import Link from "next/link";

const items = [
    {
        title: "Privacy policy",
        url: API_PATHS.ABOUT
    },
    {
        title: "Terms of service",
        url: API_PATHS.PRIVACY_POLICY
    },
    {
        title: "Contact us",
        url: API_PATHS.CONTACT_US
    },
    {
        title: "Accessibility",
        url: API_PATHS.ACCESSIBILITY
    }
]

type ItemType = {
    title: string;
    url: string;
}

const Footer = () => {
    return (
        <footer className="py-5 container border-t border-white/10">
            <div className="flex justify-between items-center">
                <div>
                    <b className="text-lg text-app-main">VIVIVI</b>
                </div>
                <div className="flex gap-6 items-center">
                    {items.map((item: ItemType, index: number) => (
                        <Link key={index} className="text-white/50 hover:text-white/100 text-sm" href={item.url}>{item.title}</Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}


export default Footer