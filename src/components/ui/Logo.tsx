import {Image} from "@nextui-org/image";

const Logo = ({theme}:{theme?:string}) => {
    return (
        <Image src={`/${theme ? theme + "-" : ''}logo.svg`} className={"min-w-[100px] h-auto rounded-none"}/>
    )
}

export default Logo