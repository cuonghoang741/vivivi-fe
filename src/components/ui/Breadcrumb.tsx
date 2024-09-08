import Link from 'next/link';

const Breadcrumb = ({items}: { items?: any }) => {
    return (
        <div className="flex gap-3 font-light">
            <Link href="/" className="text-black/50 flex gap-3 items-center text-nowrap">
                Trang chủ
                <div className={"text-black"}>/</div>
            </Link>
            {items.map((item:any,index:number)=>{
                return (
                    <>
                        <Link key={index} href={`/${item?.toLowerCase()}`} className={`text-black/50 flex gap-3 items-center ${index === items?.length - 1 ? 'limit-1-line' : 'text-nowrap'}`}>
                            {item}
                            {index !== items?.length - 1 && (
                                <div className={"text-black"}>/</div>
                            )}
                        </Link>
                    </>
                )
            })}
        </div>
    );
};

export default Breadcrumb;
