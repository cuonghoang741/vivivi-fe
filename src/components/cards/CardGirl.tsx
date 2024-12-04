import { Girl } from "@/types/girl";
import { diffDays } from "@/utils/time";
import { Button } from "@nextui-org/react";
import { Heart, Lock } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import CardGirlButtonChat from "../actions/CardGirlButtonChat";

const CardGirl = ({ girl }: { girl: Girl }) => {
    return (
        <div key={girl.id}>
        <div className="w-full h-full bg-transparent pb-[70%] relative rounded-2xl overflow-hidden" style={{ background: girl.background }}>
            <div className="absolute top-0 left-0 w-full h-full">
                <Image className="w-full h-full object-cover" src={girl.avatar_url} alt={girl.name} width={600} height={600} />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-full">
                <div className="absolute bottom-[35%] left-[6%]">
                    <Image src="/assets/images/chat-bubble.png" className="w-[100px] h-[34px]" alt="chat-bubble" width={200} height={200} />
                    <div className="text-black text-sm absolute top-0 -left-[10%] w-full h-full flex items-center justify-center">
                        <small>
                        {girl.description}
                        </small>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex justify-between p-4">
                        <div className="text-red-500 text-xs font-semibold flex gap-1 items-center">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            LIVE
                        </div>
                        <div className="text-white text-sm">
                            <Button isIconOnly startContent={<Lock size={16} className="text-black" />} size="sm"
                             className="bg-white"></Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-end bg-gradient-to-b from-transparent to-black/50 h-[40%] p-4">
                        <div className="text-white font-bold">
                            <div className="font-bold uppercase">
                            {girl.name}
                            </div>
                            <div className="text-xs flex gap-1 font-light">
                                <span>
                                {diffDays(girl.created_at)} days 
                                </span>
                                <span>
                                |
                                </span>
                                <span>
                                {girl.like_count} 
                                </span>
                                <Heart className="text-red-500 relative -top-[1px]" weight="fill" size={14} />
                            </div>
                        </div>
                        <div className="text-white text-sm">
                            <CardGirlButtonChat />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CardGirl