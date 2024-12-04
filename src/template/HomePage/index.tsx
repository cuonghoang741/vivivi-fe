import useQueryString from "@/hooks/useQueryString"
import { Button, Chip } from "@nextui-org/react"
import { Girl } from "@/types/girl"
import Image from "next/image";
import { diffDays } from "@/utils/time";
import { ArrowRight, Circle, Heart, Lock } from "@phosphor-icons/react/dist/ssr";
import CardGirl from "@/components/cards/CardGirl";
import VrmDemo from "./_sections/VrmDemo";
import Build from "./_sections/Build";
import Pricing from "./_sections/Pricing";
import FAQs from "./_sections/FAQs";

const categories = [
    "All",
    "Loli",
    "Gamer",
    "Kpop",
    "Anime",
    "Korean",
    "Chinese",
]

const mockGirls: Girl[] = [
    {
        id: "1",
        name: "Alice",
        avatar_url: "https://d1j8r0kxyu9tj8.cloudfront.net/files/vkx6jjbQEUpKKBQBaR8f1WQBdzAY6m7AzL5Ojpdl.jpg",
        categories: [{ id: "1", name: "Gamer" }, { id: "2", name: "Anime" }],
        background: "red",
        is_premium: false,
        description: "Your...",
        created_at: Date.now() / 1000,
        like_count: 6,
        player_count: 100,
    },
    {
        id: "1",
        name: "Alice",
        avatar_url: "https://d1j8r0kxyu9tj8.cloudfront.net/files/EFefQxmbmOBUZnbIzCd7RHNxHI4XEBBYpH1MhfP5.jpg",
        categories: [{ id: "1", name: "Gamer" }, { id: "2", name: "Anime" }],
        background: "red",
        is_premium: true,
        description: "anywehre",
        created_at: Date.now() / 1000,
        like_count: 10,
        player_count: 100,
    },
];

const HomePage = ({ girls = mockGirls, searchParams }: { girls: Girl[], searchParams: any }) => {
    const category = searchParams?.category || "All";    
    return (
        <div className="min-h-screen container mx-auto">
            <div className="flex flex-col items-center">
                <h1 className="text-center max-w-[400px] font-normal text-6xl">
                    AI DIGITAL
                    GIRLFRIENDS
                </h1>
                <p className="text-center font-light">
                Your soulmate, anytime, anywehre
                </p>
                <div className="flex gap-2 my-10">
                    {categories.map((item, index) => (
                        <Chip variant="light" className={`${category === item ? "text-white" : "text-white/50"}`} key={index}>
                            {item}
                        </Chip>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                    {mockGirls.map((girl, index) => (
                        <CardGirl girl={girl} key={index} />
                    ))}
                </div>
                <div className="flex justify-center items-center my-10">
                    <Button radius="full" 
                    endContent={<ArrowRight size={16} />} className="text-black bg-white px-6 py-2">
                        VIEW ALL (36)
                    </Button>
                </div>
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-center font-normal text-6xl mb-10">
                    Ask me to do <br />
                    something, senpai!
                    </h2>
                    <VrmDemo />
                </div>
                <Build />
                <Pricing />
                <FAQs />
            </div>
        </div>
    )
}

export default HomePage