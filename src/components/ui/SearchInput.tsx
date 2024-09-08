import {Input, InputProps} from "@nextui-org/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const SearchInput = ({ ...props }:{props?:InputProps}) => {
    return (
        <div className={"max-w-[780px] mx-auto"}>
            <Input
                type={"text"}
                name={"search"}
                radius={"full"}
                size={"lg"}
                placeholder={"Tìm kiếm theo từ khoá"}
                classNames={{
                    inputWrapper: "px-8 bg-[#F2F2F2]"
                }}
                {...props} // Spread the remaining props to the Input component
                startContent={
                    <MagnifyingGlass className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />
        </div>
    );
}

export default SearchInput;
