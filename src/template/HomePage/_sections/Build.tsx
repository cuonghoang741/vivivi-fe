import Image from "next/image"

const Build = () => {

    const CardTitle = ({title, description}: {title: string, description: string}) => {
        return (
            <div className="rounded-xl p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm font-light">{description}</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center my-10 pt-10">
            <h2 className="text-6xl">VIVIVI is built for you</h2>
            <p className="text-xl">
                VIVIVI is the first 3d virtual girl friend platform
            </p>
            <div className="flex flex-col gap-4 my-10">
                <div className="flex gap-4">
                    <div className="w-7/12 rounded-xl border border-gray-200/20">
                        <CardTitle title="Anytime, anywhere" description="Your girls will always be available, for you!" /> 
                        <Image className="w-full" src="/assets/images/homepage/Image div-min.png" alt="Anytime, anywhere" width={700} height={700} />
                    </div>
                    <div className="w-5/12 rounded-xl border border-gray-200/20">
                        <CardTitle title="Multiple girls at the same time" description="You are greedy, don’t cha?" /> 
                        <Image className="w-full" src="/assets/images/homepage/Container-min.png" alt="Anytime, anywhere" width={700} height={700} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-5/12 rounded-xl border border-gray-200/20">
                        <CardTitle title="Chat, call, send photos" description="You get it all" /> 
                        <Image className="w-full" src="/assets/images/homepage/Window-min.png" alt="Anytime, anywhere" width={700} height={700} />
                    </div>
                    <div className="w-7/12 rounded-xl border border-gray-200/20">
                        <CardTitle title="Available on your phone" description="Coming soon" /> 
                        <Image className="w-full" src="/assets/images/homepage/ui snippet-min.png" alt="Anytime, anywhere" width={700} height={700} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Build