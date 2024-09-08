"use client"

import React, { useState, useEffect } from 'react';

type DivImageType = {
    src: string,
    className?: string,
    fallbackUrl?: string,
}

const DivImage = ({
                      src,
                      className = '',
                      fallbackUrl = "https://d1j8r0kxyu9tj8.cloudfront.net/files/ee8TkqAJ5E6x9CPtbRnr6cmTvaX8rDEAdzNKiZdR.jpg"
                  }: DivImageType) => {
    const [backgroundImage, setBackgroundImage] = useState<string>(src);

    useEffect(() => {
        // Function to check if the image URL is valid
        const checkImageUrl = (url: string) => {
            return new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        // Check if the primary image URL is valid
        checkImageUrl(src).then(isValid => {
            if (isValid) {
                setBackgroundImage(src);
            } else {
                setBackgroundImage(fallbackUrl);
            }
        });
    }, [src, fallbackUrl]);

    return (
        <div
            className={className}
            style={{
                backgroundImage: `url('${backgroundImage}')`,
            }}
        ></div>
    );
};

export default DivImage;
