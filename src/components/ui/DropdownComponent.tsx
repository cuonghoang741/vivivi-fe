// // DropdownCustom.tsx
// import React from 'react';
// import {Dropdown} from '@nextui-org/react';
//
// // Định nghĩa kiểu cho props của DropdownCustom
// interface DropdownCustomProps {
//     options: string[];
//     buttonText?: string;
//     onSelect?: (selectedOption: string) => void;
//     children?: React.ReactNode; // Thêm prop children
// }
//
// const DropdownCustom: React.FC<DropdownCustomProps> = ({
//                                                            options,
//                                                            buttonText = 'Select',
//                                                            onSelect,
//                                                            children = <></>
//                                                        }) => {
//     return (
//         <Dropdown>
//             <Dropdown.Button flat>{buttonText}</Dropdown.Button>
//             <Dropdown.Menu aria-label="Custom Dropdown Menu" disallowEmptySelection>
//                 {options.map((option, index) => (
//                     <Dropdown.Item key={index} onClick={() => onSelect?.(option)}>
//                         {option}
//                     </Dropdown.Item>
//                 ))}
//                 {children}
//             </Dropdown.Menu>
//         </Dropdown>
//     );
// };
//
// export default DropdownCustom;
