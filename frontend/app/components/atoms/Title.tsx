import React from "react";

type TitleProps = {
    title: string;
};

export const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h1 className="mb-5 text-4xl font-bold tracking-tight text-heading align-center md:text-8xl lg:text-9xl">
            {title}
        </h1>
    );
};